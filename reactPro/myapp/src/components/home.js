import React from 'react';
import { NavLink } from 'react-router-dom' ;
import { Carousel,  WingBlank } from 'antd-mobile';
import $ from 'jquery' ;
import './../scss/home.scss';

{
// import store from './../store' ;
// import { KINDLIST } from './../reducer/actionType'
}

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: ['', '', ''],
            item : [
                {
                    name :'分类',
                    path : '/kind'
                },
                {
                    name :'VIP文',
                    path : '/vip'
                },
                {
                    name :'排行',
                    path : '/top'
                },
                {
                    name :'完结',
                    path : '/over'
                },
                {
                    name :'书单',
                    path : '/list'
                },
                {
                    name :'最新',
                    path : '/new'
                }
                ] ,
            sub : [] ,
            newMore : [] ,
            last : '',
            times : 1 ,
            initialHeight: 190,
        }
    }
    componentDidMount() {
        const that = this ;
        const url = 'https://api.doufu.la/index.php/banner/get?place=home.novel&tf_webapp=1&c_av=4.3.0' ;
        $.ajax({
            type: 'get',
            url : url,
            success:(res) => {
                var arr = [] ;
                for(var i of res.data){
                    if(i!== res.data[0]){
                        arr.push(i.images[0].imgUrl) ;
                    }

                }

                setTimeout(() => {
                    that.setState({
                        data : arr
                    });
                    console.log(that.state.data);

                }, 3000);
            },
            error: (err) => {
                console.log(err);

            }
    });

        const url0 = 'https://api.doufu.la/index.php/topics/novel_entrance?tf_webapp=1&c_av=4.3.0' ;
        $.ajax({
            type: 'get',
            url : url0,
            success:(res) => {
                that.setState({
                    sub : res.data.list

            });
                $('.loadMore').css({'display':'block'}) ;
                console.log(that.state.sub);

            },
            error: (err) => {
                console.log(err);

            }
        });
        this._isMounted = true ;

    }
    loadMore(){
        if(this._isMounted){
            const that = this ;
            var url1 ;
            var arr = [] ;
            $('.loadMore').text('加载更多中...');
            if(this.state.times === 1){
                url1 = 'https://api.doufu.la/index.php/novel/personal_recommend?last=&tf_webapp=1&c_av=4.3.0';
                this.setState({times : 2}) ;
                // $.ajax({
                //     url : url1 ,
                //     type : 'get',
                //     dataType:"json",
                //     success : (res) =>{
                //         console.log(res.data) ;
                //         that.setState({
                //             newMore : res.data.list ,
                //             last : res.data.last
                //
                //         });
                //         $('.loadMore').text('点击加载更多')
                //     },
                //     error : (err) =>{
                //         console.log(err);
                //
                //     }
                // })
            }else{
                url1 = `https://api.doufu.la/index.php/novel/personal_recommend?last=${this.state.last}&tf_webapp=1&c_av=4.3.0`;
            }
            $.ajax({
                url : url1 ,
                type : 'get',
                dataType:"json",
                success : (res) =>{
                    console.log(res.data) ;
                    var val = res.data ;
                    for(var i of val.list){
                        arr.push(i);
                    }
                    that.setState({
                        newMore : arr ,
                        last : res.data.last

                    });
                    $('.loadMore').text('点击加载更多')
                    // $('.loadMp').css({'display':'block'}) ;
                },
                error : (err) =>{
                    console.log(err);

                }
            })
        }else{

        }




    }


    componentWillUpdate(){


    }
    componentWillUnmount() {
        this._isMounted = false
    }

    // tags(){
    //     this.state.sub.map(a => (
    //         a.list.map( aa =>(
    //         if (aa.tags2) {
    //             var one = aa.tags2.split(' ')[0];
    //             return (<li>{one}</li>)
    //         } else if (aa.tags) {
    //             var two = aa.tags.map(b => (<li>{b.name}</li>))
    //             return (two)
    //
    //         }
    //     ))
    // ))
    //
    // }
    render(){

        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        return(

            <div>
                <WingBlank>
                        <Carousel
                            className="my-carousel"
                            autoplay={true}
                            infinite ={true}
                            swipeSpeed={35}
                            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            // afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(ii => (
                                <a href="#javascript:;" key={ii} style={hProp}>
                                    <img
                                        src={ ii }
                                        alt=""
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({
                                                initialHeight: 190,
                                            });
                                        }}
                                    />
                                </a>
                            ))}

                        </Carousel>
                    <div id='search'><NavLink to='/search'></NavLink></div>

                </WingBlank>
                <ul className='classItem'>
                    {this.state.item.map( a =>(<li key={a.name}><NavLink to={`/kind${a.path}&${a.name}`}>{ a.name }</NavLink></li>))}
                </ul>
                <div className='mainBody'>
                    {this.state.sub.map(i => (<div className='mainC' key={i.title}><p className='title'><strong>{i.title}</strong><span>更多</span></p>
                        <ul className='more'>{i.list.map(j => (<li key={j.add_time}><img className='album' src={j.images[0].imgUrl}/>
                            <div className='infor'><h3>{j.title}</h3>
                                <p className="des">{j.des}</p>
                                <p className='author'><img src={j.user.icon}/>
                                    <span>{j.author}</span>
                                </p>
                                {/*<ul>{ this.tags() }</ul>*/}
                            </div>
                        </li>))}
                        </ul>
                    </div>))}
                    <div className='mainC plus'>
                    <ul className='more'>
                        { this.state.newMore.map( j =>(<li key={j.add_time}><img className='album' src={j.images[0].imgUrl}/>
                            <div className='infor'><h3>{j.title}</h3>
                                <p className="des">{j.des}</p>
                                <p className='author'><img src={j.user.icon}/>
                                    <span>{j.author}</span>
                                </p>
                                {/*<ul>{ this.tags() }</ul>*/}
                            </div>
                        </li>) )}
                    </ul>
                        <div className='loadMore' onTouchStart={this.loadMore.bind(this)}>点击加载更多</div>

                    </div>
                </div>
            </div>
        )
    }
}