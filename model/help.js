import cfg from './readConfig.js'
import syw from './readData.js'
import helpList from '../resources/data/help.js'

let helpUtil = {

    getData() {
        //初始词条数量概率
        let citiao = cfg.citiao
        //各个部位掉落概率
        let buwei = cfg.buwei
        //时之沙主词条概率
        let shizhisha = cfg.shizhisha
        //空之杯主词条概率
        let kongzhibei = cfg.kongzhibei
        //理之冠主词条概率
        let lizhiguan = cfg.lizhiguan
        //副词条出现概率
        let fucitiao = cfg.fucitiao
        //强化档位概率
        let qianghua = cfg.qianghua
        //副词条强化概率
        let fucitiaoqianghua = cfg.fucitiaoqianghua
        //cd
        let cd = cfg.cd
        //撤回时间
        let recall = cfg.recall
        //使用次数
        let cishu = cfg.cishu

        let config = [citiao, buwei, shizhisha, kongzhibei, lizhiguan, fucitiao, qianghua, fucitiaoqianghua]

        //初始词条列表
        let citiaoList = ['三词条', '四词条']
        //部位列表
        let buweiList = syw.buweiList.map(item => item.name)
        //时之沙主词条列表
        let shizhishazhucitiaoList = syw.shizhishazhucitiaoList.map(item => item.display);
        //空之杯主词条列表
        let kongzhibeizhucitiaoList = syw.kongzhibeizhucitiaoList.map(item => item.display);
        //理之冠主词条列表
        let lizhiguanzhucitiaoList = syw.lizhiguanzhucitiaoList.map(item => item.display);
        //副词条列表
        let fucitiaoList = syw.fucitiaoList.map(item => item.option);
        //强化档位列表
        let qianghuaList = ['第一档', '第二档', '第三档', '第四档']

        let data = [citiaoList, buweiList, shizhishazhucitiaoList, kongzhibeizhucitiaoList, lizhiguanzhucitiaoList, fucitiaoList, qianghuaList, fucitiaoList]

        //循环把desc替换成指定样式
        for (let i = 0; i < helpList[1].list.length - 3; i++) {
            let ret = ""
            for (let k = 0; k < config[i].length; k++) {
                ret = ret + data[i][k] + ":" + config[i][k] + " "
            }

            helpList[1].list[i].desc = ret

        }
        helpList[1].list[8].desc = 'cd:' + cd
        helpList[1].list[9].desc = '撤回时间:' + recall
        helpList[1].list[10].desc = '每天使用次数:' + cishu
        return helpList
    }
}
export default helpUtil 