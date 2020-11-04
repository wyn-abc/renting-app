import React from "react";

import { TabBar } from "antd-mobile";
import { Route } from "react-router-dom";

import "./index.css";

// 导入 tabBar 菜单组件
import News from "../News";
import Index from "../Index";
import HouseList from "../List";
import Profile from "../Profile";

// TabBar 数据
const tabItems = [
  {
    title: "首页",
    icon: "icon-ind",
    path: "/home",
  },
  {
    title: "找房",
    icon: "icon-findHouse",
    path: "/home/list",
  },
  {
    title: "资讯",
    icon: "icon-infom",
    path: "/home/news",
  },
  {
    title: "我的",
    icon: "icon-my",
    path: "/home/profile",
  },
];

export default class Home extends React.Component {
  state = {
    // 默认选中的菜单项
    selectedTab: this.props.location.pathname,
  };

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
      </div>
    );
  }

  // 生命周期函数
  componentDidMount() {}

  // 渲染 tabBar 函数
  renderTabBaritem() {
    return tabItems.map((item) => (
      <TabBar.Item
        title={item.title}
        key="Life"
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === "blueTab"}
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          });
          // 切换路由
          this.props.history.push(item.path);
        }}
      />
    ));
  }

  render() {
    return (
      <div className="home">
        {/* 配置子路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/news" component={News} />
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/profile" component={Profile} />

        {/* tabBar */}
        <TabBar
          tintColor="#21b97a"
          noRenderContent={false}
          barTintColor="white"
        >
          {this.renderTabBaritem()}
        </TabBar>
      </div>
    );
  }
}
