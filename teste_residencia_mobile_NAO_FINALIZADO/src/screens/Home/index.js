/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/SkillCard/index';
import axios from 'axios';
import {
  Container,
  Scroller,
  ListArea,
} from './styles';

const Home = () => {
  const [list, setList] = useState([]);

  const getSkills = async () => {
    await axios
      .post('https://testeresidencia.herokuapp.com/userSkill/now', {
        id:1,
    }).then((res) => {console.log(res.data); setList(res.data)}).catch((err) => console.log(err))
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <Container>

      <Scroller>
        <ListArea>
          {list.map((data, k) => (
            <Card key={k} data={data} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};

export default Home;
