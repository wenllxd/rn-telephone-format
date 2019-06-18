import Mock from "mockjs";

// Mock.mock( rurl, rtype, template )
// rurl 需要拦截的url,rtype 请求类型  template 数据模板
//var Random = Mock.Random;

export default Mock.mock("/formdata1", "get", {
    success: true,
    message: "@cparagraph",
    email: "@EMAIL",
    // 属性list 的值是一个数组，其中含有1~4个元素，随机生成1~4个元素
    "list|1-5": [
        {
            // 随机id
            "id|+1": 1,
            // 随机长度的标题
            name: "@cname",
            image: "@image('200x100','#ffc0cb','Hello')",
            age: "@natural(1,70)",
            "phone|1": /^1[0-9]{10}$/
        }
    ]
});
