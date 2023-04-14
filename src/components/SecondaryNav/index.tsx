import {
  HostStyle,
  LinkActiveStyle,
  LinkInactiveStyle,
  SecondaryNavStyle,
  SearchBarContainer
} from './styles';
import {
  IOS_REFERENCE,
  ANDROID_REFERENCE,
  JS_REFERENCE,
  FLUTTER_REFERENCE,
  HOSTING_REFERENCE
} from '../../constants/links';
import ExternalLink from '../ExternalLink';
import InternalLink from '../InternalLink';
import { useRouter } from 'next/router';
import { Container } from '../Container';
import { parseLocalStorage } from '../../utils/parseLocalStorage';

import SearchBar from '../SearchBar';
import { useState, useEffect } from 'react';

export default function SecondaryNav() {
  const router = useRouter();
  const path = router.asPath;
  const [refProps, setRefProps] = useState({
    label: 'API Reference',
    url: JS_REFERENCE,
    external: true
  });
  // const filterKeys = parseLocalStorage('filterKeys', {});

  useEffect(() => {
    const filterKeys = parseLocalStorage('filterKeys', {});
    const data = {
      label: 'API Reference',
      url: (() => {
        switch ((filterKeys as { platform: string }).platform) {
          case 'ios': {
            return IOS_REFERENCE;
          }
          case 'android': {
            return ANDROID_REFERENCE;
          }
          case 'flutter': {
            return FLUTTER_REFERENCE;
          }
          default: {
            return JS_REFERENCE;
          }
        }
      })(),
      external: (() => {
        switch ((filterKeys as { platform: string }).platform) {
          case 'flutter': {
            return false;
          }
          default: {
            return true;
          }
        }
      })()
    };
    setRefProps(data);
  }, []);

  return (
    <HostStyle>
      <Container>
        <SecondaryNavStyle id="secondary-nav">
          <div className="secondary-nav-links">
            {[
              {
                label: 'Getting Started',
                url: '/start'
              },
              {
                label: 'Libraries',
                url: '/lib',
                additionalActiveChildRoots: ['/lib', '/sdk']
              },
              {
                label: 'CLI',
                url: '/cli'
              },
              {
                label: 'Studio',
                url: '/console'
              },
              {
                label: 'Hosting',
                url: HOSTING_REFERENCE,
                external: true
              },
              {
                label: 'Guides',
                url: '/guides'
              },
              {
                label: refProps.label,
                url: refProps.url,
                external: refProps.external
              }
            ].map(({ url, label, external, additionalActiveChildRoots }) => {
              const matchingRoots =
                additionalActiveChildRoots === undefined
                  ? [url]
                  : [url, ...additionalActiveChildRoots];
              const active = matchingRoots.some((root) => {
                return path.startsWith(root);
              });
              const LinkStyle = active ? LinkActiveStyle : LinkInactiveStyle;
              if (external) {
                return (
                  <ExternalLink href={url} key={label} graphic="black">
                    <span>{label}</span>
                  </ExternalLink>
                );
              } else {
                return (
                  <InternalLink href={url} key={label}>
                    <LinkStyle href={url}>{label}</LinkStyle>
                  </InternalLink>
                );
              }
            })}
          </div>
          <SearchBarContainer>
            <SearchBar />
          </SearchBarContainer>
        </SecondaryNavStyle>
      </Container>
    </HostStyle>
  );
}
