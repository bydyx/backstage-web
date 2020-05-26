import React, { Component } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button, Card, Divider, Avatar } from 'antd';
import { connect } from 'dva';
import Title from 'antd/lib/typography/Title';
import edit from '@/assets/edit.svg';
import styles from './index.less';

@connect((state) => state.ArticleDetail)
class ArticleDetail extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'ArticleDetail/clear'
        });
    }
    componentDidMount() {
        let { articleId } = this.props.location.state;
        this.props.dispatch({
            type: 'ArticleDetail/getArticleDetail',
            payload: {
                articleId: articleId,
            },
        });
    }
    edit = () => {
        let { article } = this.props;
        this.props.history.push({
            pathname: '/blog/edit',
            state: {
                article: article,
            },
        });
    };
    render() {
        let { article } = this.props;
        return (
            <Card>
                <Title>{article.title}</Title>
                <Divider />
                <MDEditor.Markdown source={article.content} />
                <Avatar onClick={this.edit} className={styles.edit} shape="square" src={edit} />
            </Card>
        );
    }
}

export default ArticleDetail;
