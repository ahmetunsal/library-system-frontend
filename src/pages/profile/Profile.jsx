import React, { useContext } from "react";
import { context } from "../../_context/GlobalContext";
import { roleConditions } from "../../utils/config";
import { Link, useNavigate } from "react-router";
import { Card, Avatar, Typography, Row, Col, Tabs } from 'antd';


const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
  const { user, REASON_CHOICES_OBJ, handleShowAlert, setIsLoggedIn } = useContext(context);
  const route = useNavigate();

  if(!user) return <>Loading..</>;

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    
    await handleShowAlert("Çıkış yapılıyor...", "warning");
    route("/");
  }

  return (
    <div className="text-black">
      <div className="user-detail-container">
        <Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div className="user-profile-section">
                <Avatar size={120} src={user.profile_picture} />
                <Title level={3}>
                  {user.first_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.username}
                </Title>
                <Text type="secondary">@{user.username}</Text>
                <div className="flex mt-5">
                  <button onClick={handleLogout} className="hover:cursor-pointer !text-white !bg-red-500 rounded-full px-3 py-1">
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={24} md={16}>
              <div className="user-info-section">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Kişisel Bilgiler" key="1">
                    <Row gutter={[16, 16]}>
                    <Col span={24}>
                      {user.email ? (
                        <>
                          <Text strong>Email: </Text>
                          <Text>{user.emai}</Text>
                        </>
                      ) : (
                        <Text>Email sisteme kayıtlı değil</Text>
                      )}
                    </Col>
                      <Col span={24}>
                        {user.phone_number ? (
                          <>
                            <Text strong>Telefon: </Text>
                            <Text>+90 {user.phone_number}</Text>
                          </>
                        ) : (
                          <Text>Telefon numarası sisteme kayıtlı değil</Text>
                        )}
                      </Col>
                      <Col span={24}>
                        {user.address ? (
                          <>
                            <Text strong>Adres: </Text>
                            <Text>{user.address}</Text>
                          </>
                        ) : (
                          <Text>Adresi sisteme kayıtlı değil</Text>
                        )}
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tab={`Favori Kitapları (${user.favorite_books.length})`}
                    key="3"
                  >
                    {/* Kullanıcı ayarları buraya gelecek */}
                    {user.favorite_books.length == 0 && (
                      <div className="flex items-center justify-center">
                        Hiç favori kitabı bulunmamaktadır.
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-3">
                      {user.favorite_books.length != 0 &&
                        user.favorite_books.map((fb) => {
                          return (
                            <div className="flex bg-zinc-200 rounded-md items-center justify-center py-3">
                              {fb.title}
                            </div>
                          );
                        })}
                    </div>
                  </TabPane>
                  <TabPane
                    tab={`Ödünç Aldıkları (${user.loans.length})`}
                    key="4"
                  >
                    {/* Kullanıcı ayarları buraya gelecek */}
                    {user.loans.length == 0 && (
                      <div className="flex items-center justify-center">
                        Hiç ödünç aldığı kitap bulunmamaktadır.
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-3">
                      {user.loans.length != 0 &&
                        user.loans.map((fb) => {
                          return (
                            <div className="flex bg-zinc-200 rounded-md items-center justify-center py-3">
                              {fb.book_title}
                            </div>
                          );
                        })}
                    </div>
                  </TabPane>
                  <TabPane tab={`Cezaları (${user.penalties.length})`} key="5">
                    {/* Kullanıcı ayarları buraya gelecek */}
                    {user.penalties.length == 0 && (
                      <div className="flex items-center justify-center">
                        Hiç cezası bulunmamaktadır.
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-3">
                      {user.penalties.length != 0 &&
                        user.penalties.map((fb) => {
                          return (
                            <div className="flex bg-zinc-200 rounded-md items-center justify-center py-3">
                              {REASON_CHOICES_OBJ[fb.reason]}
                            </div>
                          );
                        })}
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
