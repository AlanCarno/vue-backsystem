import Mock from "mockjs";
import fadeData from "./mock.json";

Mock.mock('/mock/fadeData','get',{code:200,mydata:fadeData});