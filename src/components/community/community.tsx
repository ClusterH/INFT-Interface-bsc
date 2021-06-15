import { useIntl } from 'umi';
import styles from './styles.less';

export default () => {
  const intl = useIntl();
  const handleOpen = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className={styles.community}>
      <div className={styles.content}>
        <div className={styles.title}>
          {intl.formatMessage({
            id: 'community_title',
            defaultMessage: 'Global Community',
          })}
        </div>
        <div className={styles.intro}>
          {intl.formatMessage({
            id: 'community_intro',
            defaultMessage:
              'Learn more about iNFT, chat with the team, other people in the community,and express your opinion on the future development of iNFT.',
          })}
        </div>
        <div className={styles.wrapCommunity}>
          <div
            className={[styles.item, styles.itemTg].join(' ')}
            onClick={() => handleOpen('https://t.me/iNFTglobal')}
          >
            <span className={styles.name}>
              {intl.formatMessage({
                id: 'community_telegram',
                defaultMessage: 'Telegram',
              })}
            </span>
            <span className={styles.text}>
              {intl.formatMessage({
                id: 'community_tg_intro',
                defaultMessage: 'Join out community and chat with everyone',
              })}
            </span>
          </div>
          <div
            className={[styles.item, styles.twitter].join(' ')}
            onClick={() => handleOpen('https://twitter.com/InftOffical')}
          >
            <span className={styles.name}>
              {intl.formatMessage({
                id: 'community_twitter',
                defaultMessage: 'Twitter',
              })}
            </span>
            <span className={styles.text}>
              {intl.formatMessage({
                id: 'community_twitter_intro',
                defaultMessage: 'Follow @inftOffical for updates and news',
              })}
            </span>
          </div>
          <div
            className={[styles.item, styles.github].join(' ')}
            onClick={() => handleOpen('https://github.com/')}
          >
            <span className={styles.name}>
              {intl.formatMessage({
                id: 'community_github',
                defaultMessage: 'Github',
              })}
            </span>
            <span className={styles.text}>
              {intl.formatMessage({
                id: 'community_github_intro',
                defaultMessage:
                  'Understand the progress of our code and project',
              })}
            </span>
          </div>
          <div
            className={[styles.item, styles.weibo].join(' ')}
            onClick={() => handleOpen('https://weibo.com/u/7512350596')}
          >
            <span className={styles.name}>
              {intl.formatMessage({
                id: 'community_weibo',
                defaultMessage: 'Weibo',
              })}
            </span>
            <span className={styles.text}>
              {intl.formatMessage({
                id: 'community_weibo_intro',
                defaultMessage: 'Follow @inft_IO we get the latest information',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
