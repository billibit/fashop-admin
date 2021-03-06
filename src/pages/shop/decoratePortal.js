//@flow
import React,{ Component } from "react";
import { View } from "react-web-dom";
import { message } from 'antd';
import styles from '../../styles/shop/shopIndex.css'
import Page from '../../components/public/page'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode-react';
import { historyType } from '../../utils/flow';
import ShopIndexBot from '../../components/shop/shopIndex';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../actions/shop";
import { dispatchProps } from "../../utils/defaultProps";

type Props = {
    history:historyType,
    getShopInfo:Function,
    editPortalTemplate:Function,
    shopInfo:{
        info:{
            logo:string,
            name:string,
            contact_number:string,
            description:string,
            portal_url:string,
            portal_template_id:number,
            goods_category_style:number,
            color_scheme:number,
        }
    },
    routerData: {},
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string }
}
type State = {}
@connect(
    ({ view: { shop: { shopInfo } } }) => ({
        shopInfo
    }),
    dispatch => bindActionCreators(actions, dispatch),
)
export default class DecoratePortal extends Component<Props,State> {
    componentDidMount() {
        this.props.getShopInfo()
    }
    render() {
        const { shopInfo } = this.props
        return (
            <Page>
                {/*
                <View className={styles.currentModuleWarp}>
                    <h3>当前主页模板</h3>
                    <View className={styles.currentRight}>
                        <View className={styles.qrcodeWarp}>
                            <QRCode
                                value={shopInfo.info&&shopInfo.info.portal_url}
                                // logo={require('../../images/logo-black.png')}
                                // logoWidth={68}
                                // logoHeight={20}
                            />
                        </View>
                        <View>
                            <p className={styles.hint}>微信扫描此二维码，可直接预览微信店铺</p>
                            <p>
                                <span className={styles.hintLeft}>页面名称：</span>
                                {shopInfo.info&&shopInfo.info.name}
                            </p>
                            <p>
                                <span className={styles.hintLeft}>页面ID：</span>
                                {shopInfo.info&&shopInfo.info.portal_template_id}
                            </p>
                            <p>
                                <span className={styles.hintLeft}>主页地址：</span>
                                <span
                                    style={{
                                        marginRight:'10px'
                                    }}
                                >
                                    {shopInfo.info&&shopInfo.info.portal_url}
                                </span>
                                <CopyToClipboard
                                    text={shopInfo.info&&shopInfo.info.portal_url}
                                    onCopy={() => message.success('复制成功！',1)}
                                >
                                    <a>复制</a>
                                </CopyToClipboard>
                            </p>
                        </View>
                    </View>
                </View>
                */}
                <ShopIndexBot {...this.props}/>
            </Page>
        )
    }
}
