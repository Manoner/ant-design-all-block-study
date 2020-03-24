import {Card, Table, Badge, Descriptions, Drawer, Divider, Button, Empty, Statistic} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'dva';
import {Dispatch} from 'redux';
import {GridContent, PageHeaderWrapper} from '@ant-design/pro-layout';
import {AdvancedProfileData} from "./data.d";
import styles from "./style.less";
import {CloudOutlined} from '@ant-design/icons';
import PrepareDataForm from "@/pages/scene/SceneTesting/components/PrepareDataForm";


const operationTabList = [
  {
    key: 'tab1',
    tab: '压测详情',
  },
  {
    key: 'tab2',
    tab: '监控详情',
  },
];


const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text="成功"/>;
      }
      return <Badge status="error" text="驳回"/>;
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="用户数" value={56}/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="团队内排名" value={8} suffix="/ 24"/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223}/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目数" value={56}/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="团队内排名" value={8} suffix="/ 24"/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223}/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目数" value={56}/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="团队内排名" value={8} suffix="/ 24"/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223}/>
    </div>
  </div>
);


// interface SceneTestingState {
//   operationKey: string;
//   tabActiveKey: string;
//   visible: boolean;
// }

interface SceneTestProps {
  loading: boolean;
  sceneTesting1: AdvancedProfileData;
  dispatch: Dispatch<any>
}

export const SceneTesting: React.FC<SceneTestProps> = props => {
  const [operationKey, setOperationKey] = useState('tab1');
  // const [tabActiveKey, setTabActiveKey] = useState('detail');
  const [visible, setVisible] = useState<boolean>(false);

  console.log("SceneTesting props=",props)

  const {loading, dispatch,sceneTesting1} = props;
  const {advancedOperation1, advancedOperation2} = sceneTesting1;

  useEffect(() => {
    dispatch({
      type: 'sceneTesting1/fetchAdvanced',
      payload: {
        count: 5,
      },
    });
  }, [1]);

  // const dispatchAgain = dispatch({
  //     type: 'sceneTesting1/fetchAdvanced',
  //     payload: {
  //       count: 5,
  //     },
  //   }
  // );

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const CardExtraOperate = (
    <Button type="primary" onClick={showDrawer}>
      <CloudOutlined/>准备压测数据
    </Button>
  );

  const onOperationTabChange = (key: string) => {
    console.log("onOperationTabChange key=",key);
    setOperationKey(key);
  };

  // const onTabChange = (tabActiveKey: string) => {
  //   console.log("onOperationTabChange tabActiveKey=",tabActiveKey);
  //   setTabActiveKey(tabActiveKey);
  // };

  const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
    };

  return (
    <div>
      <PageHeaderWrapper
        title="场景详情：登录-进教室并发测试"
        className={styles.pageHeader}
      >
        <div className={styles.main}>
          <GridContent>
            <Card title="场景信息"
                  style={{marginBottom: 24}}
                  bordered={false}
                  extra={CardExtraOperate}
            >
              <Drawer
                title="数据准备"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                width={720}
              >
                <PrepareDataForm/>
              </Drawer>

              <Descriptions>
                <Descriptions.Item label="场景名称">登录-进教室-举手场景并发测试</Descriptions.Item>
                <Descriptions.Item label="场景描述">这是一段场景的描述信息</Descriptions.Item>
                <Descriptions.Item label="场景描述">这是一段场景的描述信息</Descriptions.Item>
                <Descriptions.Item label="场景描述">这是一段场景的描述信息</Descriptions.Item>
              </Descriptions>
              <Divider dashed/>
              <ExtraContent/>
            </Card>

            <Card title="服务器清单" style={{marginBottom: 24}} bordered={false}>
              <Empty/>
            </Card>

            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
            {/*<PrepareDataForm />*/}

            {/*<DrawerFormFC />*/}

          </GridContent>
        </div>
      </PageHeaderWrapper>
    </div>
  );
};

export default connect(
  ({
     sceneTesting1,
     loading,
   }: {
    sceneTesting1: AdvancedProfileData;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    sceneTesting1,
    loading: loading.effects['sceneTesting1/fetchAdvanced'],
  }),
)(SceneTesting);
