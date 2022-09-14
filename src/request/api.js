import request from './request'

// 首页
export const HomeApi = ()=> request.get("/index/index")
// 登录
export const LoginApi = (params)=> request.post("/auth/loginByWeb",params)

// 搜索窗口数据
export const SearchApi = ()=> request.get("/search/index")

export const GoodshApi = (params)=> request.get("/goods/list",{params})

// 实时搜索功能
export const HelperhApi = (params)=> request.get("/search/helper",{params})

// 清除历史记录
export const ClearhistoryhApi = ()=> request.post("/search/clearhistory")

// 产品明细
export const DetailApi = (params)=> request.get("/goods/detail",{params})

// 相关产品
export const RelatedApi = (params)=> request.get("/goods/related",{params})

// 获取购物车产品数量
export const cartCountdApi = (params)=> request.get("/cart/goodscount",{params})

// 加入购物车
export const cartAddApi = (params)=> request.post("/cart/add",params)

// 获取购物车数据（含完成编辑）
export const cartIndexdApi = (params)=> request.get("/cart/index",{params})

// 点击切换商品选中状态（含全选）
export const cartCheckeddApi = (params)=> request.post("/cart/checked",params)

// 商品步进器
export const cartUpdatedApi = (params)=> request.post("/cart/update",params)

// 购物车删除
export const cartDeletedApi = (params)=> request.post("/cart/delete",params)

// 分类数据获取
export const ChannelApi = (params)=> request.get("/goods/category",{params})

// 全部分类数据接口
export const catalogApi = (params)=> request.get("/catalog/index",{params})

// 获取当前分类数据
export const catalogCurrentApi = (params)=> request.get("/catalog/current",{params})

// 专题页面数据请求
export const topicApi = (params)=> request.get("/topic/list",{params})
// 品牌制造商详情请求数据
export const GetDetailList = (params)=>request.get("/brand/detail",{params});
