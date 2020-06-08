import React, { Component } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Form, Input, Button, Card } from 'antd';
import { connect } from 'dva';
import { PageUtil } from '@/utils/pageUtil';
import { FormInstance } from 'antd/lib/form';

@connect((state) => state.ArticleDetail)
class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef<FormInstance>();
    }

    onFinish = (values) => {
        console.info(values);
        values.categoryId = 1;
        values.tagIdList = [1];
        console.info(values);
        this.props.dispatch({
            type: 'ArticleDetail/publishArticle',
            payload: values,
        });
    };

    componentDidUpdate = () => {
        // let { newArticleId } = this.props;
        // if (newArticleId > -1) {
        //     this.props.history.push({
        //         pathname: '/blog/detail',
        //         state: {
        //             articleId: newArticleId,
        //         },
        //     });
        // }
    };

    render() {
        let article = {};
        if (!PageUtil.isUndefinedOrNull(this.props.location.state)) {
            article = this.props.location.state.article;
        }
        return (
            <Form ref={this.form} initialValues={article} onFinish={this.onFinish}>
                <Form.Item
                    name="title"
                    label="标题"
                    rules={[{ required: true, message: '标题长度限制为1-到36', min: 1, max: 36 }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: '长度限制为10-到100000',
                            min: 10,
                            max: 100000,
                        },
                    ]}
                >
                    <MDEditor height="700" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default ArticleDetail;
