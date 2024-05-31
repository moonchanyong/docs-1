import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { SearchForm } from './SearchForm';
import { InstantSearch, Hits, Configure } from 'react-instantsearch';
import { Hit } from './Hit';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { useIsGen1Page } from '@/utils/useIsGen1Page';
import { Button } from '@aws-amplify/ui-react';
import { createPortal } from 'react-dom';

const searchClient = algoliasearch(
  'HBI6AAVZLI',
  'de8634c2f3bcb5e46ea2b9debb77656d'
);

export const Search = () => {
  const currentPlatform = useCurrentPlatform() || '';
  const isGen1 = useIsGen1Page();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Search</Button>

      {open && isMounted
        ? createPortal(
            <div className="search-modal">
              <div
                className="search-backdrop"
                onClick={() => setOpen(false)}
              ></div>
              <div className="search-container">
                <InstantSearch
                  future={{
                    preserveSharedStateOnUnmount: true
                  }}
                  searchClient={searchClient}
                  indexName="next-amplify"
                >
                  <Configure
                    analytics={false}
                    facetFilters={[
                      `platform:${currentPlatform}`,
                      `gen:${isGen1 ? 'gen1' : 'gen2'}`
                    ]}
                    hitsPerPage={6}
                  />
                  <SearchForm />
                  <Hits
                    classNames={{
                      list: 'search-results',
                      item: 'search-result'
                    }}
                    hitComponent={(hit) => <Hit hit={hit.hit} />}
                  />
                </InstantSearch>
              </div>
            </div>,

            document.querySelectorAll('[data-amplify-theme]')[0]
          )
        : null}
    </>
  );
};
