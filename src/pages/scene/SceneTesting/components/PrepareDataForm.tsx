import {Button, Card, Input, Form, Radio} from 'antd';
import React, {FC} from 'react';
import {Dispatch} from 'redux';
// import {PrepareDataType} from "@/pages/scene/SceneTesting/data";


const FormItem = Form.Item;
// const {Option} = Select;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};
const submitFormLayout = {
  wrapperCol: {
    xs: {span: 24, offset: 0},
    sm: {span: 10, offset: 7},
  },
};

interface PrepareDataFormProps {
  submitting?: boolean;
  dispatch?: Dispatch<any>;
}

const PrepareDataForm: FC<PrepareDataFormProps> = props => {
  // const {submitting, onSubmit} = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);


  const onFinish = (values: { [key: string]: any }) => {
    console.log("onFinish values=",values);
    // if (onSubmit) {
    //   onSubmit(values as PrepareDataType);
    // }
    // const { dispatch } = props;
    // dispatch({
    //   type: 'formAndFormBasicForm/submitRegularForm',
    //   payload: values,
    // });
    return;
  };

  // const handleSubmit = () => {
  //   if (!form) return;
  //   form.submit();
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    console.log("Draw Form onValuesChange changedValues=", changedValues)
    const {generateRule} = changedValues;
    if (generateRule) {
      setShowPublicUsers(generateRule === '2');
    }
  };

  return (
    <Card bordered={false}>
      <Form
        {...formLayout}
        hideRequiredMark
        style={{marginTop: 8}}
        form={form}
        name="basic"
        initialValues={{public: '1'}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <FormItem
          name="classType"
          label="课程类型"
          rules={[{required: true, message: "请输入任务名称"}]}
        >
          <Input placeholder="请输入"/>
        </FormItem>
        <FormItem
          name="classCount"
          label="课程数量"
          rules={[{required: true, message: "请输入任务名称"}]}
        >
          <Input placeholder="请输入"/>
        </FormItem>
        <FormItem
          name="classNum"
          label="单课人数"
          rules={[{required: true, message: "请输入任务名称"}]}
        >
          <Input placeholder="请输入"/>
        </FormItem>
        <FormItem
          name="generateRule"
          label="生成规则"
          help="帮助信息"
        >
          <div>
            <Radio.Group>
              <Radio value="1">随机生成</Radio>
              <Radio value="2">顺序生成</Radio>
            </Radio.Group>
            <FormItem style={{marginBottom: 0}} name="publicUsers">
              <Input
                style={{
                  margin: '8px 0',
                  display: showPublicUsers ? 'block' : 'none',
                }}
              />
              {/*<Select*/}
              {/*  mode="multiple"*/}
              {/*  placeholder="请输入"*/}
              {/*  style={{*/}
              {/*    margin: '8px 0',*/}
              {/*    display: showPublicUsers ? 'block' : 'none',*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <Option value="1">同事甲</Option>*/}
              {/*  <Option value="2">同事乙</Option>*/}
              {/*</Select>*/}
            </FormItem>
          </div>
        </FormItem>
        <FormItem {...submitFormLayout} style={{marginTop: 32}}>
          {/*<Button type="primary" htmlType="submit" loading={submitting}>*/}
          <Button type="primary" htmlType="submit">开始造数</Button>
        </FormItem>
      </Form>
    </Card>
  );
};

export default PrepareDataForm;
