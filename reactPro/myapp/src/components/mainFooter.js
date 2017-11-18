import React from 'react';
import { NavLink } from 'react-router-dom'

export default class MainFooter extends React.Component{
    constructor(props){
        super(props) ;
        this.state =  {
            item : [
                {
                     bg :'../assets/imgs/home_selected-1.png' ,
                     name : '耽美',
                     path : '/home'
                },
                {
                    bg :'../assets/imgs/book_selected@3x.png' ,
                    name : '书架',
                    path : '/bookshelf'

                },
                {
                    bg :'../assets/imgs/me_selected@3x.png' ,
                    name : '我的',
                    path : '/mine'

                }

            ]

        }
    }



    render(){
            const arr = [] ;
            for(var i of this.state.item){
                arr.push(<li key={i.path} ><NavLink  to={i.path} className='now'><span></span><span></span><span>{i.name}</span></NavLink></li>)
            }

            return (
                <ul>
                    {arr}
                </ul>
            )
        }

}