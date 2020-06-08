import React, {Component} from "react";
import {Card} from "antd";

// @connect((state) => state.ArticleDetail)
export default class ApiPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{height: "900px"}}>
                <iframe
                    src="http://39.106.184.95:10800/swagger-ui.html"
                    style={{width: '100%', height: '900px'}}
                    width="100%"
                    height="900px"
                    frameBorder="0"
                />
            </Card>
        );
    }
}
