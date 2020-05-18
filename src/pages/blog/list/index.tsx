import { Card, List, Avatar } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

@connect(state => state.article)
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            pagination: {
                current: 1,
                pageSize: 10,
                hideOnSinglePage: true,
                onChange: (e) => this.setPagination(e),
            },
        };
    }

    componentDidMount() {
        let { pagination } = this.state;
        this.props.dispatch({
            type: 'article/getArticleList',
            payload: pagination,
        });
    }

    setPagination(current) {
        let state = this.state;
        this.state = {
            ...state,
            current,
        };
    }

    render() {
        let { articleList, pagination } = this.state;

        return (
            <Card>
                <List
                    itemLayout="horizontal"
                    dataSource={articleList}
                    pagination={pagination}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <a key="list-loadmore-edit">edit</a>,
                                <a key="list-loadmore-more">more</a>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.title}</a>}
                                description={
                                    'Ant Design, a design la UED Tead by Ant UED Tead by Ant UED Tead by Ant UED Team'
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default Article;
