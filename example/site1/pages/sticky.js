import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual} from "../../../index"




@observer
class PageView extends React.Component {



  constructor(props) {
    super(props)
  }
  
 

  render() {
    return (<xz.ScrollView scrollKey="StickyViewScroll" pageview={this}>
    	 <div>1</div>
    	 <br/>
    	 <div>2</div>
    	 <br/>
    	 <div>3</div>
    	 <xz.StickyView scrollKey="StickyViewScroll" pageview={this}>
    	 	<div className="test-sticky-header">asdasdasdasdasds</div>
    	 </xz.StickyView>
    	 <br/>
    	 <div>4</div>
    	 <br/>
    	 <div>5</div>
    	 <xz.StickyView scrollKey="StickyViewScroll" pageview={this}>
    	 	<div className="test-sticky-header">hahhah</div></xz.StickyView>
    	 <br/>
    	 <div>6</div>
    	 <br/>
    	 <div>7</div>
    	 <br/>
    	 <div>8</div>
    	 <xz.StickyView scrollKey="StickyViewScroll" pageview={this}>
    	 <div className="test-sticky-header">111</div></xz.StickyView>
    	 <br/>
    	 <div>9</div>
    	 <br/>
    	 <div>10</div>
    	 <br/>
    	 <div>11</div>
    	 <xz.StickyView scrollKey="StickyViewScroll" pageview={this}>
    	 <div className="test-sticky-header">222</div></xz.StickyView>
    	 <br/>
    	 <div>12</div>
    	 <br/>
    	 <div>13</div>
    	 <xz.StickyView scrollKey="StickyViewScroll" pageview={this}>
    	 <div className="test-sticky-header">33</div></xz.StickyView>
    	 <br/>
    	 <div>14</div>
    	 <br/>
    	 <div>15</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>17</div>
    	 <br/>
    	 <div>18</div>
    	 <br/>
    	 <div>19</div>
    	 <br/>
    	 <div>20</div>
    	 <br/>
    	 <div>27</div>
    	 <br/>
    	 <div>28</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
    	 <div>16</div>
    	 <br/>
      </xz.ScrollView>);
  }
}
export default PageView;
