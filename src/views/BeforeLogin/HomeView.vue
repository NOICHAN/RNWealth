<template>
<div class="banner mb-5">
    <div class="bannerContent p-1 text-center">
        <h1>管理你的財富從記帳開始</h1>
        <router-link class="btn btn-primary" to="/login">立即開始</router-link>
    </div>
</div>
<div class="container">
    <h2 class="mb-5">NWealth  特色</h2>
    <div class="row justify-content-center justify-content-md-between mb-5 gy-5">
        <div class="col-10 col-md-4 col-lg-3 text-center card align-items-center">
            <img src="@/assets/images/Frame-1.png" alt="專業客服" class="my-3">
            <h3>專業客服</h3>
            <p>不管再小的問題都不會忽略專業客服<br/>不怕你問<br/>怕你不問</p>
        </div>
        <div class="col-10 col-md-4 col-lg-3 text-center card align-items-center">
            <img src="@/assets/images/Frame-2.png" alt="每月自動分配" class="my-3">
            <h3>每月自動分配</h3>
            <p>每月將會在您指定的日期自動幫您匯入您指定金額設定一次永久自動不怕忘記</p>
        </div>
        <div class="col-10 col-md-4 col-lg-3 text-center card align-items-center">
            <img src="@/assets/images/Frame-3.png" alt="收支圖表分析" class="my-3">
            <h3>收支圖表分析</h3>
            <p>運用圖表分析讓您更容易了解自身財務狀況隨時隨地都可以檢視收支狀</p>
        </div>
    </div>
    <div class="row mb-5 justify-content-center justify-content-md-between knowledge gy-4
    align-items-md-center">
        <div class="col-8 col-md-6 ">
            <img src="@/assets/images/card-1.png" class="knowledgeImg" alt="">
        </div>
        <div class="col-8 col-md-6">
            <h3 class="mb-3">為什麼許多人說理財的第一步是記帳?</h3>
                <p>只有弄清楚自己的財務狀況，才能考慮如何去理財投資。</p>
                <p>記帳如果只是「被動」的紀錄，還是存不了錢，你還要「主動」先做預算，才能做為你每個月檢討改進的依據。</p>
        </div>
    </div>
    <div class="row flex-md-row-reverse justify-content-center
    justify-content-md-between knowledge gy-4
    align-items-md-center">
        <div class="col-8 col-md-6">
            <img src="@/assets/images/card-2.png" class="knowledgeImg" alt="">
        </div>
        <div class="col-8 col-md-6 mx-auto">
            <h3 class="mb-3">記帳的好處?</h3>
            <ul>
                <li>了解金錢的流向</li>
                <li>幫助檢視消費的必要性</li>
                <li>控制花費</li>
            </ul>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>
@import "../../../node_modules/bootstrap/scss/functions";
@import "@/assets/helpers/variables";
@import "../../../node_modules/bootstrap/scss/mixins";
    .banner {
        height: calc(100vh - 56px);
        background-image: url('@/assets/images/banner-sm.png');
        background-size: cover;
        background-position: top center;
        position: relative;
        @include media-breakpoint-up(md) {
            height: calc(100vh - 56px);
            background-image: url('@/assets/images/banner.png');
            background-position: left center;
        }
        .bannerContent {
            h1 {
                white-space:nowrap;
            }
            .btn-primary {
                width: 327px;
                font-size: 20px;
                color: #303030;
                padding: 16px 0;
                border-radius: 32px;
                @include media-breakpoint-up(md) {
                    width: 160px;
                }
            }
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            @include media-breakpoint-up(md) {
                left: 70%;
            }
        }
    }
    .container {
        h2 {
            text-align: center;
        }
    }
    .knowledge {
        text-align: center;
        ul {
            list-style-type: none;
            padding-left: 0;
        }
    }
    .knowledgeImg {
        object-fit: cover;
        object-position: center center;
    }
    .card {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
        border-radius: 32px;
        img {
            width: 160px;
            height: 160px;
        }
    }
</style>
