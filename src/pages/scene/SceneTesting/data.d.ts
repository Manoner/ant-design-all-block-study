export interface AdvancedOperation1 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation2 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}


export interface AdvancedProfileData {
  advancedOperation1: AdvancedOperation1[];
  advancedOperation2: AdvancedOperation2[];
}

export interface PrepareDataType {
  classType:string; // 课程类型
  classCount:number; // 课程数量
  classNum:number; // 单课人数
  generateRule:number; // 生成规则

}
