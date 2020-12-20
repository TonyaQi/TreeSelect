import React from 'react';
import {Checkbox} from 'antd';
import {DownOutlined, RightOutlined} from '@ant-design/icons';
import clone from '../utils/index';

class TreeSelect extends React.Component{
    
    constructor(props) {
        super(props);
        this.data = clone(props.data)
        const makeData = (node) => {
            if(node && node.children) {
                node.children.forEach(item => {
                    item.parent = node;
                    makeData(item);
                })
            }
        }
        this.data.forEach(item => {
            makeData(item);
        })

        this.state = {
            value: []
        }
    }


    toggleExpand = (node, expand) => {
        node.expand = expand;
        this.forceUpdate();
    }

    makeChildren = (node, checked, value) => {
        let que = [node];
        while(que.length) {
            let cur = que.shift();
            if(cur.children && cur.children.length > 0 ) {
                cur.children.forEach(item => {
                    if(item.checked !== checked)
                    que.push(item);
                })
            } 
            cur.checked = checked;
            if(checked) {
                value.push({
                    title: cur.title,
                    key: cur.key
                })
            }
        }
    }

    makeParent = (node, checked, value) => {
        let current = node;
        while(current.parent) {
            let isHalf = current.parent.children.some(item => item.checked !== checked || item.indeterminate)

            current.parent.checked = isHalf ? false : checked;
            current.parent.indeterminate = isHalf

            current = current.parent
        }
    }


    setNodeStatus = (node, checked) => {
        let value = [];
        node.checked = checked;
        this.makeChildren(node, checked, value);
        console.log(value);
        this.makeParent(node, checked, value);
        this.forceUpdate();
    }

    generateTree = (data, lastNode) => {
        if(!data || data.length < 1) return null;
        return (
            <ul 
                style={{
                    display: (!lastNode || lastNode.expand) ? 'block' : 'none'
                }}
            >
                {
                    data.map(item => {
                        return (
                            <li>
                            {
                                Array.isArray(item.children) 
                                ? item.expand ? 
                                <DownOutlined onClick={() => this.toggleExpand(item, !item.expand)}/>
                                : <RightOutlined onClick={() => this.toggleExpand(item, !item.expand)}/>
                                : null
                            }
                            <Checkbox
                                checked={item.checked}
                                indeterminate={item.indeterminate}
                                onChange={() => this.setNodeStatus(item, !item.checked)}
                            >
                                {item.title}
                            </Checkbox>
                            {
                                this.generateTree(item.children, item)
                            }
                        </li>
                        )
                    })
                }
            </ul>
        )
    };

    render(){
        console.log(this.data);
        return (
            <div>
                {
                    this.generateTree(this.data)
                }
            </div>
        )
    }
};

TreeSelect.propTypes = {
    allowClear: Boolean,
    placeholder: String,
    searchPlaceholder: String,
    showCheckedStrategy: String,
    dropDownStyle: Object,
    style: Object,
    treeData: Array,
    value: Array,
    searchRange: Array,
    onChange: Function,
    filterTreeNode: Function
}
export default TreeSelect;