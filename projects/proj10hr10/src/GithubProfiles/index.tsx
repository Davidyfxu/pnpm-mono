import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Input } from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";
const getUser = async (username: string) => {
  try {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    return respData;
  } catch (e) {
    console.error(e);
  }
};
const getRepos = async (username: string) => {
  try {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();
    return respData;
  } catch (e) {
    console.error(e);
  }
};
const APIURL = "https://api.github.com/users/";

const UserCard = (props: any) => {
  const { user, repos } = props;
  return (
    <div className={styles.card}>
      <div>
        <img
          className={styles.avatar}
          src={user?.avatar_url}
          alt={user?.name}
        />
      </div>
      <div className={styles.userInfo}>
        <h3>{user?.name}</h3>
        <p>{user?.bio}</p>
        <ul className="info">
          <li>
            {user?.followers}
            <strong>Followers</strong>
          </li>
          <li>
            {user?.following}
            <strong>Following</strong>
          </li>
          <li>
            {user?.public_repos}
            <strong>Repos</strong>
          </li>
        </ul>
        <div className="repos">
          {repos
            .sort((a: any, b: any) => b?.stargazers_count - a?.stargazers_count)
            .slice(0, 10)
            .map((i: any) => (
              <a className={styles.repo} href={i?.html_url}>
                {i.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

const GithubProfiles = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    try {
      if (name.length > 0) {
        getUser(name).then((u) => setUser(u));
        getRepos(name).then((r) => setRepos(r));
      }
    } catch (e) {
      console.error(e);
    }
  }, [name]);

  return (
    <div className={styles.body}>
      <h3>Search a Github User</h3>
      <Input
        className={styles.searchPanel}
        suffix={<IconSearch />}
        showClear
        defaultValue={name}
        onEnterPress={(e: any) => {
          setName(String(e.target.value));
        }}
      />
      <UserCard user={user} repos={repos}></UserCard>
    </div>
  );
};

export default GithubProfiles;
