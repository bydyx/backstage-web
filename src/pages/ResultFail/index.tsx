import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Result } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import React, { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';

const Content = (
  <Fragment>
    <div className={styles.title}>The content you submitted has the following error:</div>
    <div
      style={{
        marginBottom: 16,
      }}
    >
      <CloseCircleOutlined
        style={{
          marginRight: 8,
        }}
        className={styles.error_icon}
      />
      Your account has been frozen
      <a
        style={{
          marginLeft: 16,
        }}
      >
        Thaw immediately
        <RightOutlined />
      </a>
    </div>
    <div>
      <CloseCircleOutlined
        style={{
          marginRight: 8,
        }}
        className={styles.error_icon}
      />
      Your account is not yet eligible to apply
      <a
        style={{
          marginLeft: 16,
        }}
      >
        Upgrade immediately
        <RightOutlined />
      </a>
    </div>
  </Fragment>
);
export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="error"
        title="resultfail.error.title"
        subTitle="resultfail.error.description"
        extra={<Button type="primary">Return to modify</Button>}
        style={{
          marginTop: 48,
          marginBottom: 16,
        }}
      >
        {Content}
      </Result>
    </Card>
  </GridContent>
);
