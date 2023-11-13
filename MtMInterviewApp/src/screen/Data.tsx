import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataType, initDataType} from '../type';
import {areaCount} from '../helper';

const Data = () => {
  const [data, setData] = useState<DataType[] | [DataType]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [areasCount, setAreasCount] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://cultureexpress.taipei/OpenData/Event/C000003',
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data !== null) {
      const array = Object.keys(areaCount(data));
      const value = Object.values(areaCount(data));
      setAreas(array);
      setAreasCount(value);
    }
  }, [data]);
  return (
    <View style={{width: '100%', height: '100%'}}>
      <FlatList
        style={{height: '50%', borderBottomColor: '#000', borderBottomWidth: 2}}
        contentContainerStyle={{marginBottom: 50}}
        data={areas}
        keyExtractor={item => item}
        renderItem={({item, index}: {item: any; index: number}) => (
          <>
            <Text>
              {item}: {areasCount[index]}
            </Text>
          </>
        )}
      />
      <FlatList
        style={{}}
        contentContainerStyle={{}}
        data={data}
        initialNumToRender={5}
        renderItem={({item}: {item: DataType}) => (
          <>
            <View style={{margin: 10}}>
              <Text>活動名稱：{item.Caption}</Text>
              <Image source={{uri: item.ImageFile}} />
              <Text>活動起始日期：{item.StartDate}</Text>
              <Text>活動結束日期：{item.EndDate}</Text>
              <Text>
                票價：{item.TicketType === '免費' ? '免費' : item.TicketPrice}
              </Text>
              <Text>區域名：{item.City + ' ' + item.Area}</Text>
            </View>
          </>
        )}
        keyExtractor={(item, index) => item.ID + index}
      />
    </View>
  );
};

export default Data;
