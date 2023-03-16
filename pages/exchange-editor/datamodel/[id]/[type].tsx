import { Box, BoxProps, Button, Card, CardBody, CardFooter, CardHeader, Heading, Layer, Text, Tip } from 'grommet';
import { Book, Close, Favorite, FormEdit, Hide } from 'grommet-icons';
import { useRouter } from 'next/router';
import React from 'react';
import { Data, DataModelContent, DataModelPageTemplate, EditDataForm, TipContent } from '../../../../components';
import mockData from '../mocks/abstract.json';

export async function getStaticProps() {
    return {
        props: {
            dataModelData: mockData,
        },
    };
}

export interface DataModelPageProps extends BoxProps {
    /** DataModelPage data */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataModelData: any;
    /** DataModelPage component children */
    children?: React.ReactNode;
}

/** DataModelPage that displays data models */
const DataModelPage = ({ dataModelData }: DataModelPageProps) => {
    const [showEditForm, setShowEditForm] = React.useState(false);
    const [currentFormIndex, setCurrentFormIndex] = React.useState(0);

    const generateShowFormCallback = (index: number) => () => {
        setCurrentFormIndex(index);
        setShowEditForm(true);
    };

    const router = useRouter();
    const mainLocation = '/exchange-editor/datamodel/51780/data_model';

    return (
        <DataModelPageTemplate>
            <DataModelContent
                dataModelContentArray={[
                    router.pathname === mainLocation
                        ? {
                              tabTitle: 'Main',
                              content: (
                                  <Box pad="large" gap="medium">
                                      <Card width="100%" background="light-1">
                                          <CardHeader pad={{ horizontal: 'medium', top: 'medium' }}>
                                              <Tip
                                                  plain
                                                  content={
                                                      <TipContent>{dataModelData[0]?.[0]?.data[0]?.value}</TipContent>
                                                  }
                                              >
                                                  <Heading margin="none" level="2" truncate>
                                                      {dataModelData[0]?.[0]?.data[0]?.value}
                                                  </Heading>
                                              </Tip>
                                          </CardHeader>
                                          <CardBody pad="medium">
                                              <Box direction="row" gap="small">
                                                  <Box
                                                      direction="row"
                                                      align="center"
                                                      gap="xsmall"
                                                      background={'secondary'}
                                                      round="xsmall"
                                                      pad="xsmall"
                                                  >
                                                      <Book size="19px" color="white" />
                                                      <Text weight={'normal'} color="white">
                                                          1.0.0
                                                      </Text>
                                                  </Box>
                                                  <Box
                                                      direction="row"
                                                      align="center"
                                                      gap="xsmall"
                                                      background={'grey'}
                                                      round="xsmall"
                                                      pad="xsmall"
                                                  >
                                                      <Text weight={'normal'} color="white">
                                                          Private
                                                      </Text>
                                                      <Hide size="19px" color="white" />
                                                  </Box>
                                              </Box>
                                          </CardBody>
                                          <CardFooter pad={{ horizontal: 'small' }} background="light-2" justify="end">
                                              <Button icon={<FormEdit color="plain" />} hoverIndicator />
                                          </CardFooter>
                                      </Card>
                                      {dataModelData.map((dataSet, k) => (
                                          <Card width="100%" background="light-1" key={`dataset-card-${k}`}>
                                              {dataSet.map((values, i) => (
                                                  <React.Fragment key={`dataset-${k}-${i}`}>
                                                      <Tip plain content={<TipContent>{values?.title}</TipContent>}>
                                                          <Box key={`card-header-${k}-${i}`}>
                                                              {i === 0 ? (
                                                                  <CardHeader pad="medium">
                                                                      <Heading margin="none" level="3" truncate>
                                                                          {values?.title}
                                                                      </Heading>
                                                                  </CardHeader>
                                                              ) : (
                                                                  <Heading
                                                                      margin={{ bottom: 'none', left: 'medium' }}
                                                                      level="4"
                                                                      truncate
                                                                  >
                                                                      {values?.title}
                                                                  </Heading>
                                                              )}
                                                          </Box>
                                                      </Tip>
                                                      <CardBody pad="medium" key={`dataset-body-${k}-${i}`}>
                                                          {values?.data?.map((data, j) => (
                                                              <Box
                                                                  key={`dataset-body-item-${k}-${i}-${j}`}
                                                                  direction="row"
                                                                  margin={{ vertical: '3px' }}
                                                              >
                                                                  <Box width="small" flex={{ shrink: 0 }}>
                                                                      <Tip
                                                                          plain
                                                                          content={<TipContent>{data.key}</TipContent>}
                                                                      >
                                                                          <Text weight={'bold'} truncate>
                                                                              {data.key}
                                                                          </Text>
                                                                      </Tip>
                                                                  </Box>
                                                                  <Box>
                                                                      <Tip
                                                                          plain
                                                                          content={
                                                                              <TipContent>{data.value}</TipContent>
                                                                          }
                                                                      >
                                                                          <Text truncate>{data.value}</Text>
                                                                      </Tip>
                                                                  </Box>
                                                              </Box>
                                                          ))}
                                                      </CardBody>
                                                  </React.Fragment>
                                              ))}
                                              <CardFooter pad={{ horizontal: 'small' }} background="light-2">
                                                  <Button icon={<Favorite color="red" />} hoverIndicator />
                                                  <Button
                                                      onClick={generateShowFormCallback(k)}
                                                      icon={<FormEdit color="plain" />}
                                                      hoverIndicator
                                                  />
                                              </CardFooter>
                                              {showEditForm && currentFormIndex === k && (
                                                  <Layer position="center" onEsc={() => setShowEditForm(false)}>
                                                      <Box
                                                          pad={'medium'}
                                                          direction="row"
                                                          align="center"
                                                          justify="between"
                                                      >
                                                          <Heading level="3" margin={'0px'}>
                                                              {dataModelData[k]?.[0].title}
                                                          </Heading>
                                                          <Button
                                                              plain
                                                              label={<Close />}
                                                              onClick={() => setShowEditForm(false)}
                                                          />
                                                      </Box>
                                                      <EditDataForm
                                                          values={dataSet?.reduce(
                                                              (acc, cv) => ({
                                                                  ...acc,
                                                                  ...cv.data.reduce(
                                                                      (acc2, cv2) => ({
                                                                          ...acc2,
                                                                          [`${cv2.key}`]: cv2.value,
                                                                      }),
                                                                      {},
                                                                  ),
                                                              }),
                                                              {},
                                                          )}
                                                      />
                                                  </Layer>
                                              )}
                                          </Card>
                                      ))}
                                  </Box>
                              ),
                          }
                        : {
                              tabTitle: 'Main',
                              content: (
                                  <Box pad={'large'}>
                                      <Heading level="2">Example2 Class Etc.</Heading>
                                      <Text margin={{ bottom: 'small' }} weight={'bold'}>
                                          Title Example 1
                                      </Text>
                                      <Text>Example2 Class Etc.</Text>
                                      <Text>Example2 Class Etc.</Text>
                                      <Text>Example2 Class Etc.</Text>
                                      <Text>Example2 Class Etc.</Text>
                                      <Text>Example2 Class Etc.</Text>
                                  </Box>
                              ),
                          },
                    {
                        tabTitle: 'Activity',
                        content: (
                            <Box pad={'large'}>
                                <Heading level="2">Example2 Class Etc.</Heading>
                                <Text margin={{ bottom: 'small' }} weight={'bold'}>
                                    Title Example 2
                                </Text>
                                <Text>Example2 Class Etc.</Text>
                                <Text>Example2 Class Etc.</Text>
                                <Text>Example2 Class Etc.</Text>
                                <Text>Example2 Class Etc.</Text>
                                <Text>Example2 Class Etc.</Text>
                            </Box>
                        ),
                    },
                    { tabTitle: 'Flows From', content: <Box pad={'large'}>Example3</Box> },
                    { tabTitle: 'Flows To', content: <Box pad={'large'}>Example</Box> },
                    { tabTitle: 'Imported By', content: <Box pad={'large'}>Example</Box> },
                    { tabTitle: 'Related To', content: <Box pad={'large'}>Example</Box> },
                ]}
            />
        </DataModelPageTemplate>
    );
};

export default DataModelPage;

const generateIdsParams = (id) => {
    const paths = [];
    for (const type in Data) {
        paths.push({
            params: {
                id,
                type,
            },
        });
    }
    return paths;
};


//TODO turn on strict in tsconfig.json
export async function getStaticPaths() {
    const paths = generateIdsParams('51780');
    return {
        paths,
        fallback: false,
    };
}
