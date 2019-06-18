import Mock from "mockjs";

//post 发送数据
export default Mock.mock("/postdata2", "post", {
  success: true,
  message: "@cparagraph",
  "list|1-4": [
    {
      id: "@id"
    }
  ]
});
