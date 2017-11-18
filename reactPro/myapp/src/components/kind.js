import React from 'react';
import { NavLink } from 'react-router-dom';
import './../scss/kind.scss';
import $ from 'jquery';


export default class Kind extends React.Component {
    constructor(props){
        super(props) ;
        this.state =({
            content : [] ,
            more : [],
            item : [] ,
            pic : [] ,
            board : [
                {
                    name : "畅销榜"

                },
                {
                    name : '包养榜'
                },
                {
                    name : '更新榜'
                },
                {
                    name : '菊花榜'
                },
                {
                    name : '新书榜'
                },
                {
                    name : '总字榜'
                },
                {
                    name : '催更榜'
                },
                {
                    name : '月票榜'
                }
            ],
            boardList : [] ,
            isImg : false ,
            isVip : false ,
            isKind : false,
            isMore : false ,
            isBoard : false
        })


    }

    componentWillMount(){
        const kindItem = this.props.match.params.path ;
        this.getData(kindItem) ;

    }
    componentDidMount(){
        $('.title').text('加载中...') ;
        if(this.props.match.params.path === 'kind'){
            $('#moreKind').css({'display':'block'}) ;
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.path !== this.props.match.params.path){
            window.location.reload();
        }

    }
    componentDidUpdate(){
        var that = this ;
        console.log(this.state.props);
        function changeTop(index){
            that.setState({isBoard: true});
            const url0 = 'https://api.doufu.la/index.php/albums/items?id=137'+index+5+'&begin=0&last=&lastStart=0&rows=0&size=20&start=0&tf_webapp=1&c_av=4.3.0';
            $.ajax({
                url : url0 ,
                type : 'get',
                success : (res) => {
                    // if(that.state.isBoard){
                    console.log(res.data.items) ;
                    that.setState({
                        boardList :  res.data.items
                    })
                    // }
                },
                error : (err) => {
                    console.log(err) ;
                }
            })
        }

    }
    back(){
        window.history.back(-1);
    }
    getData(kindItem){
        var that =this ;
        var url0 ;
        if(kindItem === 'kind'){
            url0 = 'https://api.doufu.la/index.php/entrance_item/novel_category?begin=0&last=&lastStart=0&rows=0&sex=1&size=20&start=0&tf_webapp=1&c_av=4.3.0' ;
            change(url0);
            that.setState({isKind : true }) ;
        }
        if(kindItem === 'vip'){
            that.setState({isVip : true }) ;

            url0 = 'https://api.doufu.la/index.php/albums/items?id=1316&last=&size=20&tf_webapp=1&c_av=4.3.0' ;
            change(url0);
        }
        if(kindItem === 'over'){

            url0 = 'https://api.doufu.la/index.php/post/topics?type=18&finished=1&last=&size=20&last=&size=20&tf_webapp=1&c_av=4.3.0';
            change(url0);

        }
        if(kindItem === 'new'){

            url0 = 'https://api.doufu.la/index.php/topics/latestNovels?last=&size=20&tf_webapp=1&c_av=4.3.0';
            change(url0);
        }
        if( kindItem === 'list'){
            that.setState({isImg : true }) ;
            url0 = 'https://api.doufu.la/index.php/albums/items?id=70&begin=0&last=&lastStar=0&rows=0&size=20&star=0&tf_webapp=1&c_av=4.3.0' ;
            change(url0);


        }
        if( kindItem === 'moreKind'){
                that.setState({isMore : true }) ;
                url0 = 'https://api.doufu.la/index.php/entrance_item/novel_more_category?begin=0&last=&lastStart=0&rows=0&sex=1&size=20&start=0&tf_webapp=1&c_av=4.3.0' ;
                change(url0);
            }
        function change(url0){
            $.ajax({
                url : url0,
                type : 'get',
                dataType : 'json',
                success : (res) =>{
                    // console.log(res.data) ;
                    if(that.state.isKind){
                        that.setState({
                            content : res.data.list
                        })
                    }
                    if(that.state.isMore){
                        that.setState({
                            more : res.data.list
                        })
                    }
                    if( that.state.isImg ){
                        that.setState({
                            pic : res.data.items
                        }) ;
                        console.log(res.data.items,111) ;

                    }
                    if(that.state.isVip){
                        that.setState({
                            item :  res.data.items
                        })
                    }
                    if( res.data.main || res.data.novels ){
                        that.setState({
                            item :  res.data.main || res.data.novels ,
                        })
                    }

                    const header = that.props.match.params.name ;
                    $('.title').text(header);

                },
                error : (err) => {
                    console.log(err)

                }
            })
        }

    }

    render(){
        $('#footer').css({'display':'none'});

        return(
            <div className='content'>
                <div className='top'>
                    <span onTouchStart={this.back.bind(this)} className='back'></span>
                    <h2 className='title'></h2>
                    <NavLink id='moreKind' to='/kind/moreKind&更多分类'>更多分类</NavLink>
                </div>
                <ul className='kind'>
                { this.state.content.map( i =>(<li key={i.num}><img src={i.imgUrl} />
                    <p className='title'><h2>{i.title}</h2><span className={i.num==0?'hide':''}>{ i.num }部作品</span></p></li>))}
                </ul>
                <ul className='more'>{this.state.item.map(j => (<li key={j.add_time}><p className='album'><img  src={j.images[0].imgUrl}/><span className="vip"></span></p>
                    <div className='infor'><h3>{j.title}</h3>
                        <p className="des">{j.des}</p>
                        <p className='author'><img src={j.user.icon}/>
                            <span>{j.author}</span>
                        </p>
                        {/*<ul>{ this.tags() }</ul>*/}
                    </div>
                </li>))}
                </ul>
                <ul className='pic'>
                    {this.state.pic.map(j => (<li key={ j.id }><img src={j.icon}/><p>{ j.name}</p></li>))}
                </ul>
                <ul className='kindPlus'>{this.state.more.map( a => (<li><span>{ a.title}</span><span>{a.num}部作品<b></b></span></li>))}</ul>
                <ul className='board'>{
                    // this.state.board.map( (i,index) => (<li key={i.name}><span onTouchStart={ this.state.props.changeTop(index).bind(this)}>{i.name}</span></li>))
                }</ul>
                <ul className='subBoard'>

                </ul>
            </div>
        )
    }
}