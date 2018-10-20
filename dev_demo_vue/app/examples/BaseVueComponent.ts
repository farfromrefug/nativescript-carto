import Vue from 'nativescript-vue';
import { Page } from 'tns-core-modules/ui/page/page';
import { isAndroid, isIOS } from 'tns-core-modules/platform/platform';
import { CartoMap } from '~/nativescript-carto/ui/ui';

export default class BaseVueComponent extends Vue {
    public isAndroid = isAndroid;
    public isIOS = isIOS;
    get page() {
        return (this.$refs.page as any).nativeView as Page;
    }
    get mapView() {
        return (this.$refs.mapView as any).nativeView as CartoMap;
    }
    mounted() {
    }
}
