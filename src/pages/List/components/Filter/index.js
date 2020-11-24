import React, { Component } from "react";
import axios from "axios";

import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";

import styles from "./index.module.css";
import { render } from "@testing-library/react";

// 标题高亮状态
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
};

// 筛选条件选中值
const selectedValues = {
  area: ["area", "null"],
  mode: ["null"],
  price: ["null"],
  more: [],
};

export default class Filter extends Component {
  // 状态
  state = {
    // 标题高亮状态
    titleSelectedStatus,
    // 前三个菜单对应内容的显示与隐藏
    openType: "",
    // 筛选条件拿数据
    housIf: {},
    // 筛选条件选中值
    selectedValues,
  };

  // 点击标题菜单实现高亮
  onTitleClick = (type) => {
    const { titleSelectedStatus, selectedValues } = this.state;

    // 创建一个新的选中状态对象
    const newtitleSelectedStatus = { ...titleSelectedStatus };

    Object.keys(titleSelectedStatus).forEach((key) => {
      // 当前选中菜单高亮
      if (key === type) {
        newtitleSelectedStatus[key] = true;
        return;
      }

      // 点击菜单时判断其他标题高亮状态
      const selectVal = selectedValues[key];
      if (
        key === "area" &&
        (selectVal.length !== 2 || selectVal[0] !== "area")
      ) {
        newtitleSelectedStatus[key] = true;
      } else if (key === "mode" && selectVal[0] !== "null") {
        newtitleSelectedStatus[key] = true;
      } else if (key === "price" && selectVal[0] !== "null") {
        newtitleSelectedStatus[key] = true;
      } else if (key === "more" && selectedValues.more.length !== 0) {
        newtitleSelectedStatus[key] = true;
      } else {
        newtitleSelectedStatus[key] = false;
      }
      // console.log(key, type);
    });

    this.setState({
      openType: type,
      titleSelectedStatus: newtitleSelectedStatus,
    });

    // console.log(newtitleSelectedStatus);
    // console.log(selectedValues);
  };

  // 隐藏对话框（取消按钮点击）
  onCancel = (type) => {
    const { titleSelectedStatus, selectedValues, openType } = this.state;

    // 控制高亮状态
    const newtitleSelectedStatus = { ...titleSelectedStatus };
    const selectVal = selectedValues[openType];
    if (
      openType === "area" &&
      (selectVal.length !== 2 || selectVal[0] !== "area")
    ) {
      newtitleSelectedStatus[openType] = true;
    } else if (openType === "mode" && selectVal[0] !== "null") {
      newtitleSelectedStatus[openType] = true;
    } else if (openType === "price" && selectVal[0] !== "null") {
      newtitleSelectedStatus[openType] = true;
    } else if (openType === "more" && selectedValues.more.length !== 0) {
      newtitleSelectedStatus[openType] = true;
    } else {
      newtitleSelectedStatus[openType] = false;
    }

    this.setState({
      openType: "",
      titleSelectedStatus: newtitleSelectedStatus,
    });

    // console.log(type, openType);
    console.log(selectedValues);
  };

  // 隐藏对话框（确认按钮点击）
  onSave = (type, value) => {
    const { titleSelectedStatus, selectedValues } = this.state;

    const newtitleSelectedStatus = { ...titleSelectedStatus };

    // 高亮处理
    if (type === "area" && (value.length !== 2 || value[0] !== "area")) {
      newtitleSelectedStatus[type] = true;
    } else if (type === "mode" && value[0] !== "null") {
      newtitleSelectedStatus[type] = true;
    } else if (type === "price" && value[0] !== "null") {
      newtitleSelectedStatus[type] = true;
    } else if (type === "more" && value.length !== 0) {
      // 筛选项
      newtitleSelectedStatus[type] = true;
    } else {
      newtitleSelectedStatus[type] = false;
    }

    // 默认选中值
    const newSelectedValues = {
      ...this.state.selectedValues,
      [type]: value,
    };

    // 获取默认选中值
    const filters = {};
    const { area, mode, price, more } = newSelectedValues;
    // 区域
    const areaKew = area[0];
    let areaValue = "null";
    if (area.length === 3) {
      areaValue = area[2] !== "null" ? area[2] : area[1];
    }
    filters[areaKew] = areaValue;
    // 方式和租金
    filters.mode = mode[0];
    filters.price = price[0];
    // 筛选
    filters.more = more.join(",");

    // 调用父组件方法，传递默认选中值
    this.props.getFilter(filters);

    this.setState({
      openType: "",
      // 修改默认选中值
      selectedValues: newSelectedValues,
      titleSelectedStatus: newtitleSelectedStatus,
    });

    // console.log(type, value);
    // console.log(value.length);
    // console.log(selectedValues);
    // console.log("最新选中值", newSelectedValues);
    // console.log("获取的默认选中值", filters);
  };

  // 获取筛选条件数据
  async getHousIf() {
    const { data: res } = await axios.get(
      "http://localhost:8080/houses/condition?id=AREA%7C88cff55c-aaa4-e2e0"
    );

    if (res.status !== 200) {
      console.log("获取数据失败");
    }

    this.setState({
      housIf: res.body,
    });
  }

  componentDidMount() {
    this.getHousIf();
  }

  // 渲染 FilterPicker 组件
  renderFilterPicker() {
    const {
      openType,
      housIf: { area, subway, rentType, price },
      selectedValues,
    } = this.state;

    if (openType !== "area" && openType !== "mode" && openType !== "price") {
      return null;
    }

    // 根据筛选条件获取相应数据
    let data = [];
    let cols = 3;
    let selectedValue = selectedValues[openType];

    switch (openType) {
      case "area":
        data = [area, subway];
        cols = 3;
        break;
      case "mode":
        data = price;
        cols = 1;
        break;
      case "price":
        data = rentType;
        cols = 1;
        break;
      default:
        break;
    }

    return (
      <FilterPicker
        onCancel={this.onCancel}
        onSave={this.onSave}
        data={data}
        cols={cols}
        type={openType}
        selectedValues={selectedValue}
        key={openType}
      />
    );
  }

  // 渲染 FilterMore 组件
  renderFilterMore() {
    const {
      openType,
      housIf: { roomType, oriented, floor, characteristic },
      selectedValues,
    } = this.state;

    const data = {
      roomType,
      oriented,
      floor,
      characteristic,
    };

    const defaultValue = selectedValues.more;

    if (openType === "more") {
      return (
        <FilterMore
          onCancel={this.onCancel}
          onSave={this.onSave}
          data={data}
          type={openType}
          defaultValue={defaultValue}
        />
      );
    }

    return null;
  }

  render() {
    const { titleSelectedStatus, openType } = this.state;

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {openType === "area" || openType === "mode" || openType === "price" ? (
          <div className={styles.mask} onClick={this.onCancel} />
        ) : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    );
  }
}
