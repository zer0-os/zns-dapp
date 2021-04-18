import { FC, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
// import { useDomainCache } from '../../../lib/useDomainCache';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import './css/nftpage.scss';
import TableImage from '../table/table-image';
// import NFTImage from './nft-image';
import neo2 from './img/neo2.jpeg';
import nFTpAGE from '../../css/video/nFTpAGE.mp4';
import neo from './img/mockusers/neo.png';
import cat from './img/mockusers/cat.png';
import phoenix from './img/mockusers/phoenix.png';
import vape from './img/mockusers/vape.png';
import Modal from 'antd/lib/modal/Modal';
import wilder from './img/mockusers/wilder.png';

import FutureButton from '../../Buttons/FutureButton/FutureButton.js';
import Enlist from '../../Enlist/Enlist'

import StaticEmulator from '../../../lib/StaticEmulator/StaticEmulator.js';

interface ProfileProps {
  domain: string;
}

const NFTPage: FC<ProfileProps> = ({ domain: _domain }) => {
  const [isNftVisible, setNftVisible] = useState(false);
  const context = useWeb3React<Web3Provider>();
  const { library, account, active, chainId } = context;
  // const { useDomain } = useDomainCache();
  // const domainContext = useDomain(_domain);
  // const { domain } = domainContext;
  const location = useLocation();

  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const openPreview = () => setPreviewOpen(true);
  const closePreview = () => setPreviewOpen(false);

  const [ enlist, setEnlist ] = useState(false)
  const openEnlist = () => setEnlist(true)
  const closeEnlist = () => setEnlist(false)

  const routes = _.transform(
    location.pathname
      .substr(1)
      .split('.')
      .filter((s) => s !== ''),
    (acc: [string, string][], val, i) => {
      let next = 0 < i ? acc[i - 1][1] + '.' + val : val;
      acc.push([val, next]);
    },
  );

  const showNft = () => {
    setNftVisible(true);
  };

  const nftOk = () => {
    setNftVisible(false);
  };

  const nftCancel = () => {
    setNftVisible(false);
  };

  const historyRow = (name: string, number: string, days: string, img: any) => {
    return (
      <div className="historyRow">
        <div className="historyLeft">
          <img src={img} alt="" className="avatar" />
          <div className="historyText">
            <span className="embolden">{name}</span> placed a bid for{' '}
            <span className="embolden">{number} WILD</span>
          </div>
        </div>
        {/* <div className="historyRight">
          {days} days ago <span className="viewTx">[view tx]</span>
        </div> */}
      </div>
    );
  };

  // if (domain.isNothing()) return null;
  return (
    <div className="nftView">
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("assets/galaxy.jpeg")`,
        }}
        className="showcase border-primary"
      >
        <div className="showcaseIMG">
          <img
            onClick={openPreview}
            style={{ height: '100%', width: '100%' }}
            src={StaticEmulator(routes[routes.length - 1][0])}
          />
          {/* <NFTImage domain={domain.value.domain} /> */}
        </div>
        <div className="showcaseInfo">
          <div className="topmid">
            <div className="top">
              <div className="title glow-text-white">
                {routes[routes.length - 1][0]}
              </div>
              <div className="domain">
                <Link to={location.pathname} className="network">
                  0:/{location.pathname}
                </Link>
              </div>
              <div className="users">
                <div className="creator">
                  <img src={wilder} alt="" className="avatar" />
                  <div className="creatorFlex">
                    <div className="creatorText">Frank Wilder</div>
                    <div className="desc">Creator</div>
                  </div>
                </div>
                <div className="owner">
                  <img src={neo} alt="" className="avatar" />
                  <div className="ownerFlex">
                    <div className="ownerText">Neo Wilder</div>
                    <div className="desc">Owner</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="midLeft">
                <div className="units">250 LOOT</div>
                <div className="price">[$1,304.12]</div>
              </div>
              {/* <div className="midRight">
              <div className="text">Current Price</div>
              <div className="units">65,045 LOOT</div>
              <div className="price">$23,401,123.43</div>
            </div> */}
            </div>
          </div>
          <div className="showcaseBottom">
            <div className="shadowContainer">
              <FutureButton onClick={openEnlist} glow>Enlist</FutureButton>
            </div>
          </div>
        </div>
      </div>
      <div className="info">
        <div className="story border-primary">
          <div>STORY</div>
          <div style={{ fontSize: 16 }}>
            To understand where we are, we must honor what has come before us.
            With NFTs catapulting Crypto into the mainstream, it shouldn’t be
            forgotten that the DeFi movement of 2020 helped pave the way.
            Digital art and crypto have served as a catalyst to one another
            reinventing modern art as we know it. With characters like n3o, the
            Wilders, Beeple and Elon all playing a significant role it’s only
            right we break bread to celebrate. While Mickey was so infatuated
            with the Wilder VR experience he didn’t take the time to eat, the
            other attendees enjoyed uni, sushi, pancake and pineapple on the set
            menu for the evening. With the NFT wave taking the world by storm,
            the Wilders have had a plan of their own... Wilder World will be
            opening as a fully interactive 3D world, with all characters present
            in the DeFi dinner game ready. We’ll be launching the immersive
            world with our next event, the first annual Cyber Gala in July 2021.
            The collector of this piece will be blessed with a custom fully
            functional "in world" avatar to roam Wilder World.
          </div>
        </div>
        <div className="quad">
          <div className="top">
            <div className="views border-primary">
              <div className="quadHeader">VIEWS</div>
              <div className="quadText">12,317</div>
            </div>
            <div className="edition border-primary">
              <div className="quadHeader">
                <span>EDITION</span>
                <span className="infoButton">
                  <span className="infoMark">?</span>
                </span>
              </div>
              <div className="quadText">1 of 1</div>
            </div>
          </div>
          <div className="address border-primary">
            <div className="quadHeader">
              <span>ETH ADDRESS</span>
              <span className="infoButton">
                <span className="infoMark">?</span>
              </span>
            </div>
            <div className="quadText">{account && account.length ? account : 'Connect a wallet to see your Ethereum address!'}</div>
          </div>
        </div>
      </div>

      <div className="bottom border-primary">
        <div className="history">
          <div className="historyTitle">HISTORY</div>
          <div className="historyBox">
            {historyRow('Phoenix', '280', '4', phoenix)}
            {historyRow('Frank', '180', '6', wilder)}
            {historyRow('Neo', '50', '8', neo)}
            {historyRow('Cyber_Cat', '6', '8', cat)}
            {historyRow('Cyber_Cat', '200', '8', cat)}
            {historyRow('Frank', '230', '10', wilder)}
            {historyRow('888', '43', '10', vape)}
            {historyRow('Neo', '34', '11', neo)}
          </div>
        </div>
      </div>
      <Modal
        visible={isPreviewOpen}
        onCancel={closePreview}
        closable={false}
        centered
        footer={null}
      >
        <img src={StaticEmulator(routes[routes.length - 1][0])} />
      </Modal>
      <Modal
        visible={enlist}
        onCancel={closeEnlist}
        closable={false}
        centered
        footer={null}
      >
        <Enlist name={location.pathname} props={{image: StaticEmulator(routes[routes.length - 1][0])}} />
      </Modal>
    </div>
  );
};
export default NFTPage;
