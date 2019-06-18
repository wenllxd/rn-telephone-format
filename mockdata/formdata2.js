import Mock from "mockjs";

// Mock.mock( rurl, rtype, template )
// rurl 需要拦截的url,rtype 请求类型  template 数据模板
export default Mock.mock("/formdata2", "post", {
    success: true,
    message: "@cparagraph",
    email: "@EMAIL",
    // 属性list 的值是一个数组，其中含有1~4个元素，随机生成1~4个元素
    "list|1-4": [
        {
            // 随机id
            id: "@id",
            // 随机长度的标题
            title: "@title()",
            image: "@image('200x100','#ffc0cb','Hello')",
            date: '@date("yyyy-MM-dd")'
        }
    ]
});
