import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ListItem, Overlay} from 'react-native-elements';

const UserOverlay = ({
  visible,
  content,
  handleBackPress,
}: {
  visible: boolean;
  content: string;
  handleBackPress: () => void;
}) => {
  return (
    <View>
      <Overlay
        overlayStyle={{padding: 20}}
        isVisible={visible}
        onBackdropPress={handleBackPress}>
        <Text>{content}</Text>
      </Overlay>
    </View>
  );
};

const List = () => {
  const [posts, setPosts] = useState<any>([]);
  const [post, setPost] = useState<string>('');
  const [visible, setVisible] = useState(false);
  //   const screenHeight = Dimensions.get('window').height;
  useEffect(() => {
    try {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setPosts(result);
        });
    } catch (error) {
      console.log('error ', error);
    }
  }, []);

  return (
    <View
      style={{
        // height: screenHeight,
        backgroundColor: Colors.white,
      }}>
      {posts.map((singlePost: any) => {
        return (
          <ListItem
            key={singlePost?.id}
            bottomDivider
            onPress={() => {
              setVisible(true);
              setPost(singlePost.title);
            }}>
            <Text>{singlePost?.title}</Text>
          </ListItem>
        );
      })}
      <UserOverlay
        visible={visible}
        content={post}
        handleBackPress={() => setVisible(!visible)}
      />
    </View>
  );
};

export default List;
