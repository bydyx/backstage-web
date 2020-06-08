import { Card, List, Avatar } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

@connect((state) => state.article)
class Article extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { pagination } = this.props;
        this.props.dispatch({
            type: 'article/getArticleList',
            payload: pagination,
        });
    }

    setPagination = (current) => {
        let { pagination } = this.props;
        pagination.current = current;
        this.props.dispatch({
            type: 'article/getArticleList',
            payload: pagination,
        });
    };

    seeDeatil = (item) => {
        this.props.history.push({
            pathname: '/blog/detail',
            state: {
                articleId: item.id,
            },
        });
    };

    render() {
        let that = this,
            setPagination = this.setPagination;
        let { articleList, pagination } = this.props;

        return (
            <Card>
                <List
                    itemLayout="horizontal"
                    dataSource={articleList}
                    pagination={{ ...pagination, onChange: setPagination }}
                    renderItem={(item) => that.getItemMeta(item)}
                />
            </Card>
        );
    }

    getItemMeta(item) {
        return (
            <List.Item onClick={() => this.seeDeatil(item)}>
                <List.Item.Meta title={item.title} description={item.contentSummary} />
            </List.Item>
        );
    }
}

export default Article;
