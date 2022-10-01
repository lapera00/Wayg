import FeedShare from './FeedShare';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
// import { counter } from '@fortawesome/fontawesome-svg-core';

import { connect } from "react-redux";

function Feed({counter, feedNo, feedTitle, feedContent, feedNickname, userNo, feedFile, feedLike,feedLikeYn}) {
  const [feed, setFeed] = useState({
    feedNo: {feedNo}.feedNo,
    feedTitle: {feedTitle}.feedTitle,
    feedContent: {feedContent}.feedContent,
    feedNickname: {feedNickname}.feedNickname, 
    userNo: {userNo}.userNo, 
    feedFile: {feedFile}.feedFile === null ? './noPhoto.png' : {feedFile}.feedFile , 
    feedLike: {feedLike}.feedLike, 
    feedLikeYn: {feedLikeYn}.feedLikeYn,
  })
  
  const [detailContent,setDetailContent] = useState('')
  const [handle, setHandle] = useState(false);
  const handleClose = () => setHandle(false);
  const [likeYn, setLikeYn] = useState(null)

  const plusLike = async () => {
    try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`feed/like`
          ,{
          // userNo: {userNo}.userNo,
          userNo: counter.userNo,
          feedNo: {feedNo}.feedNo
        });
        // console.log(response.data)
        if (response.data.message === 'success'){
          let new_feed = feed
          new_feed.feedLikeYn = true;
          new_feed.feedLike+=1
          
          await setFeed(new_feed)
          await setLikeYn(true)
          console.log('aaaaa')
          
        }
      } catch (e) {
        
      }
  };
  

  const deleteLike = async () => {
    try {
        const response = await axios.delete(
          process.env.REACT_APP_HOST+`feed/like/1`
          
          ,
          {
          params: {
            userNo: counter.userNo,
            feedNo: {feedNo}.feedNo,
          }
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          let new_feed = feed
          new_feed.feedLikeYn = false;
          new_feed.feedLike-=1
          
          await setFeed(new_feed)
          await setLikeYn(false)


          
        }
      } catch (e) {
        
      }
    };

  const shareKakaoLink = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: feed.feedTitle,
        description: feed.feedContent,
        imageUrl:
          'feedFile',
        link: {
          mobileWebUrl: `https://j7c202.p.ssafy.io/api/main/detail/FeedShare/${feed.feedNo}`,
          webUrl: `https://j7c202.p.ssafy.io/api/main/detail/FeedShare/${feed.feedNo}`,
        },
      },
      itemContent: {
        // profileText: 'Kakao',
        // profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      },
      social: {
        likeCount: feed.feedLike,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: `https://j7c202.p.ssafy.io/api/main/detail/FeedShare/${feed.feedNo}`,
            webUrl: `https://j7c202.p.ssafy.io/api/main/detail/FeedShare/${feed.feedNo}`,
          },
        },
      ],
    });
  }

  const share = async () => {
    try {
      console.log('share')
      shareKakaoLink()
      } catch (e) {
        
      }
  };
  
  const onClickFeed = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_HOST+`feed/view?userNo=${userNo}&feedNo=${feedNo}`
      )
      console.log(response.data.feed.feedContent)
      await setDetailContent(response.data.feed.feedContent)
      await setHandle(true)
    }catch (e) {
      console.log(e)
    }
  } 

  return (
    // for map 사용
    <>
    <div className={styles.feed}>
      <div className={styles.feed_div}>
        <img onClick={onClickFeed} className={styles.feed_img} src={feed.feedFile} onError={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src='./noPhoto.png';
        }} alt='img' />
        <div>
          <div className={styles.feed_box}>
            {feed.feedLikeYn ? 
              <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
              : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />}
            &nbsp;&nbsp;
            <FontAwesomeIcon onClick={share} icon={faPaperPlane} />
          </div>
          <div>
                <small>{feed.feedLike}명이 좋아요를 눌렀습니다.</small>
          </div>
          <div className={styles.feed_box}> 
            <div className={styles.feed_writer}>{feed.feedNickname}</div>
          </div>
          <div className={styles.feed_title}>{feed.feedTitle}</div>
        </div>
        </div>
    </div>
    {/* 모달 */}
    <Modal className={styles.modal} size="md" show={handle} onHide={handleClose}>
    <Card style={{weight:"496px", height:"635px"}}>
      <Card.Header style={{height:"500px", width:"496px", paddingBottom: "0px",
    paddingRight: "0px",
    paddingLeft: "0px",
    paddingTop: "0px"}} as="h5">
        <img className={styles.cardImg} src={feed.feedFile} alt='img' />
      </Card.Header>
      <Card.Body>
        {feed.feedLikeYn ? 
          <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
        : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />}
        &nbsp;&nbsp;
        <FontAwesomeIcon onClick={share} icon={faPaperPlane} />
        <Card.Text>
          <small>{feed.feedLike}명이 좋아요를 눌렀습니다.</small>
          <p className={styles.show_writer}>작성자</p>
          <div style={{fontSize:"15px", fontWeight:"bold"}}>{feedNickname}</div>
          <div style={{fontSize:'12px'}}>{feedContent}</div>
        </Card.Text>
      </Card.Body>
    </Card>
      </Modal>
      {/* <FeedShare style={{display: "none"}}/> */}
    </>
  )
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Feed);
