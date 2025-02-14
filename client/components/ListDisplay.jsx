/**
 * ************************************
 *
 * @module  ListDisplay
 * @author
 * @date
 * @description presentation component that display the trail list
 *
 *
 * ************************************
 */

import React from "react";
import Styles from "../styles.css"


//display component for limited trail info, name clicks through to trail display and difficulty clicks through to difficulty key
const ListDisplay = (props) => (
  <div className={props.idx % 2 ? 'odds' : 'evens'}>
    <div className='column'>
      <p id={props.id} className='namePlace' onClick={(e) => props.getTrail(props.id)}>
        {/* below code solves async issues with populating trailData array*/}
        {props.trailData.length > 0 && props.name}:&nbsp;
        {props.trailData.length > 0 && props.location}
      </p>
    </div>
    <div className='column'>
      <p id={props.id} className='length'>
        {props.trailData.length > 0 && props.length} miles
      </p>
    </div>
    <div className='column'>
      <p
        id={props.id}
        className='difficulty'
        onClick={() => props.setDiffKey((props.diffKey ? false : true))}>
        {props.trailData.length > 0 && props.difficulty}
      </p>
      <br/>
    </div>
  </div>
);

export default ListDisplay;
