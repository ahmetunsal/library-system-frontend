import React, { useContext, useEffect, useState } from 'react';
import { Card, Avatar, Typography, Row, Col, Tabs } from 'antd';
import { useParams } from 'react-router';
import { context } from '../../../_context/GlobalContext';
import { REASON_CHOICES, REASON_CHOICES_OBJ, userObj } from '../../../utils/config';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const UserDetail = () => { 
  const { id } = useParams();
  const [user, setUser] = useState();
  const { getSingleUser } = useContext(context);

  useEffect(() => {
    const getUser = async () => {
      const user = await getSingleUser(id);
      setUser(user.data);
    }

    getUser();
  }, []);

  useEffect(() => {
    console.log("USER_",user)
  }, [user]);

  if(!user) return <>Loading..</>

  return (
    <div className="user-detail-container">
      <Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className="user-profile-section">
              <Avatar size={120} src={user.profile_picture} />
              <Title level={3}>{user.first_name ? `${user.first_name} ${user.last_name}` : user.username}</Title>
              <Text type="secondary">@{user.username}</Text>
            </div>
          </Col>
          <Col xs={24} md={16}>
            <div className="user-info-section">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Kişisel Bilgiler" key="1">
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Text strong>E-posta: </Text>
                      <Text>{user.email}</Text>
                    </Col>
                    <Col span={24}>
                      <Text strong>Telefon: </Text>
                      <Text>+90 {user.phone_number}</Text>
                    </Col>
                    <Col span={24}>
                      <Text strong>Konum: </Text>
                      <Text>{user.address}</Text>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab={`Favori Kitapları (${user.favorite_books.length})`} key="3">
                    {/* Kullanıcı ayarları buraya gelecek */}
                    {user.favorite_books.length == 0 && <div className='flex items-center justify-center'>Hiç favori kitabı bulunmamaktadır.</div>}
                    <div className="grid grid-cols-3 gap-3">
                      {user.favorite_books.length != 0 && user.favorite_books.map(fb =>  {
                        return (
                          <div className="flex bg-zinc-200 rounded-md items-center justify-center py-3">
                            {fb.title}
                          </div>
                        )
                      })}
                    </div>
                </TabPane>
                <TabPane tab={`Ödünç Aldıkları (${user.loans.length})`} key="4">
                  {/* Kullanıcı ayarları buraya gelecek */}
                  {user.loans.length == 0 && <div className='flex items-center justify-center'>Hiç ödünç aldığı kitap bulunmamaktadır.</div>}
                  <div className="grid grid-cols-3 gap-3">
                    {user.loans.length != 0 && user.loans.map(fb =>  {
                        return (
                          <div className="flex bg-zinc-200 rounded-md items-center justify-center py-3">
                            {fb.book_title}
                          </div>
                        )
                    })}
                  </div>
                </TabPane>
                <TabPane tab={`Cezaları (${user.penalties.length})`} key="5">
                  {/* Kullanıcı ayarları buraya gelecek */}
                  {user.penalties.length == 0 && <div className='flex items-center justify-center'>Hiç cezası bulunmamaktadır.</div>}
                  <div className="grid grid-cols-3 gap-3">
                    {user.penalties.length != 0 && user.penalties.map(fb =>  {
                        return (
                          <div className="flex bg-zinc-200 rounded-md items-center justify-center py-3">
                            {REASON_CHOICES_OBJ[fb.reason]}
                          </div>
                        )
                    })}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserDetail; 