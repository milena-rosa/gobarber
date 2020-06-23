import styled from 'styled-components/native';
import { Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Form as UnformForm } from '@unform/mobile';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin: 64px 0 24px;
`;

export const Form = styled(UnformForm)`
  width: 100%;
`;

export const BackToSignIn = styled.TouchableOpacity`
  background: #312e38;
  border-top-color: #232129;
  border-top-width: 1px;
  bottom: 0;
  left: 0;
  padding: 16px 0;
  position: absolute;
  right: 0;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const BackToSignInText = styled.Text`
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
