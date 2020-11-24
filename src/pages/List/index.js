import React from "react";
import styles from "./index.module.css";
import axios from "axios";

// 导入搜索导航栏组件
import Filter from "./components/Filter";

import { Flex } from "antd-mobile";

export default class List extends React.Component {
  state = {
    // 房屋列表数据
    houseData: [],
  };

  // 获取默认选中值，并发送请求，获取筛选房屋数据
  onFilter = async (filters) => {
    this.filter = filters;

    // 获取当前定位城市
    const id = JSON.parse(localStorage.getItem("hkzf_city"));

    // 发送请求获取房屋数据
    const { data: res } = await axios.get("http://localhost:8080/houses", {
      params: {
        cityId: id.valu,
        ...this.filter,
        start: 1,
        end: 20,
      },
    });
    if (res.status !== 200) {
      return console.log("获取数据失败");
    }
    this.setState({
      houseData: res.body.list,
    });

    // console.log(filters);
    // console.log("房屋数据", res);
  };

  render() {
    return (
      <div className={styles.list}>
        {/* 顶部搜索导航 */}
        {/* 条件筛选栏 */}
        <Filter getFilter={this.onFilter} />
      </div>
    );
  }
}
