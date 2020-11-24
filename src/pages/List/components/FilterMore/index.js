import React, { Component } from "react";

import FilterFooter from "../../../../components/FilterFooter";

import styles from "./index.module.css";

export default class FilterMore extends Component {
  state = {
    // 选中项的值
    selectValues: this.props.defaultValue,
  };

  // 标签点击事件
  tabClick(value) {
    const { selectValues } = this.state;
    const newSelectValues = [...selectValues];

    if (newSelectValues.indexOf(value) === -1) {
      // 该项没有高亮
      newSelectValues.push(value);
    } else {
      // 该项已经高亮
      // 获取当前选项索引
      const index = newSelectValues.findIndex((item) => item === value);
      newSelectValues.splice(index, 1);

      console.log(index);
    }

    this.setState({
      selectValues: newSelectValues,
    });

    console.log(newSelectValues);
  }

  // 清除按钮点击事件
  onCancel = () => {
    this.setState({
      selectValues: [],
    });
  };

  // 渲染标签
  renderFilters(data) {
    const { selectValues } = this.state;

    return data.map((item) => {
      const isChoose = selectValues.indexOf(item.value) > -1;

      return (
        <span
          key={item.value}
          className={[styles.tag, isChoose ? styles.tagActive : ""].join(" ")}
          onClick={() => {
            this.tabClick(item.value);
          }}
        >
          {item.label}
        </span>
      );
    });
  }

  render() {
    const {
      onCancel, // 取消按钮
      onSave, // 确定按钮
      data: { roomType, oriented, floor, characteristic },
      type,
    } = this.props;

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={() => onCancel(type)} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          className={styles.footer}
          onCancel={this.onCancel}
          onOk={() => onSave(type, this.state.selectValues)}
          cancelText="清除"
        />
      </div>
    );
  }
}
