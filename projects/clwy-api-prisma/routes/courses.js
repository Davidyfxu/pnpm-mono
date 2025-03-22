import { failure, success } from "../utils/responses.js";
import express from "express";
import prisma from "../lib/prisma.js";
import { NotFoundError } from "../utils/errors.js";
import { getKey, setKey } from "../utils/redis.js";

const router = express.Router();

/**
 * 查询课程列表
 * GET /
 */
router.get("/", async function (req, res) {
  try {
    const query = req.query;
    const categoryId = query.categoryId;

    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;
    if (!categoryId) {
      throw new Error("获取课程列表失败，分类ID不能为空。");
    }
    const cacheKey = `courses:${categoryId}:${currentPage}:${pageSize}`;
    let data = await getKey(cacheKey);
    if (data) {
      return success(res, "查询文章列表成功。", data);
    }
    const condition = {
      omit: {
        categoryId: true,
        userId: true,
        content: true,
      },
      where: {
        categoryId: Number(categoryId),
      },
    };
    const courses = await prisma.courses.findMany({
      ...condition,
      skip: offset, // 跳过的记录数,
      take: pageSize, // 返回的记录数
      orderBy: {
        id: "desc",
      },
    });
    // 查询总记录数
    const total = await prisma.courses.count({
      where: {
        categoryId: Number(categoryId),
      },
    });
    data = {
      courses,
      pagination: {
        total,
        currentPage,
        pageSize,
      },
    };
    await setKey(cacheKey, data);

    success(res, "查询课程数据成功。", data);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 查询课程详情
 * GET /:id
 */
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const course = await prisma.courses.findUnique({
      omit: {
        categoryId: true,
        userId: true,
      },
      where: {
        id: Number(id),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        chapters: {
          select: {
            id: true,
            title: true,
            rank: true,
            createdAt: true,
          },
          orderBy: [{ rank: "asc" }, { id: "desc" }],
        },
        user: {
          select: {
            id: true,
            username: true,
            nickname: true,
            avatar: true,
            company: true,
          },
        },
      },
    });
    if (!course) {
      throw new NotFoundError(`ID: ${id}的课程未找到。`);
    }
    success(res, "查询课程详情成功。", { course });
  } catch (error) {
    failure(res, error);
  }
});

export default router;
