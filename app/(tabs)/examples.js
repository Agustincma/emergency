import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  Title,
  Paragraph,
  Avatar,
  Badge,
  Chip,
  Divider,
  FAB,
  IconButton,
  ProgressBar,
  RadioButton,
  Switch,
  Snackbar,
  Surface,
  Text,
  ToggleButton,
  ActivityIndicator,
  DataTable,
  Dialog,
  Portal,
  Banner,
  Appbar,
  List,
  Menu,
  Searchbar,
} from 'react-native-paper';

export default function ExamplesScreen() {
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState('first');
  const [snackVisible, setSnackVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={{ flex: 1 }}>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Ejemplo de Dialog</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Este es un ejemplo de diálogo de Material UI</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Appbar.Header>
        <Appbar.Content title="Material UI Examples" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action 
              icon="dots-vertical" 
              onPress={() => setMenuVisible(true)} 
            />
          }
        >
          <Menu.Item onPress={() => {}} title="Opción 1" />
          <Menu.Item onPress={() => {}} title="Opción 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Configuración" />
        </Menu>
      </Appbar.Header>

      {bannerVisible && (
        <Banner
          visible={bannerVisible}
          actions={[
            {
              label: 'Fijar',
              onPress: () => setBannerVisible(false),
            },
            {
              label: 'Descartar',
              onPress: () => setBannerVisible(false),
            },
          ]}
          icon={({ size }) => (
            <Avatar.Icon size={size} icon="information" />
          )}
        >
          Este es un banner informativo de Material UI
        </Banner>
      )}

      <View style={{ padding: 16 }}>
        <Searchbar
          placeholder="Buscar..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginBottom: 16 }}
        />

        <Card style={{ marginBottom: 16 }}>
          <Card.Title
            title="Botones y FAB"
            subtitle="Diferentes tipos de botones"
            left={(props) => <Avatar.Icon {...props} icon="gesture-tap" />}
          />
          <Card.Content>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <Button mode="contained">Contained</Button>
              <Button mode="outlined">Outlined</Button>
              <Button mode="text">Text</Button>
              <Button mode="contained-tonal">Tonal</Button>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <IconButton icon="heart" size={20} />
              <IconButton icon="share" size={20} />
              <IconButton icon="bookmark" size={20} />
            </View>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Chips y Badges" />
          <Card.Content>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <Chip icon="information">Info Chip</Chip>
              <Chip mode="outlined" onPress={() => {}}>
                Clickable Chip
              </Chip>
              <Chip onClose={() => {}}>Closable Chip</Chip>
            </View>
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
              <Text>Notificaciones</Text>
              <Badge>5</Badge>
              <Text>Mensajes</Text>
              <Badge visible={true}>12</Badge>
            </View>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Controles" />
          <Card.Content>
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>Switch</Text>
                <Switch value={switchValue} onValueChange={setSwitchValue} />
              </View>
              
              <View>
                <Text style={{ marginBottom: 8 }}>Radio Buttons</Text>
                <RadioButton.Group onValueChange={setRadioValue} value={radioValue}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="first" />
                    <Text>Primera opción</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="second" />
                    <Text>Segunda opción</Text>
                  </View>
                </RadioButton.Group>
              </View>

              <View>
                <Text style={{ marginBottom: 8 }}>Toggle Buttons</Text>
                <ToggleButton.Row
                  onValueChange={(value) => setRadioValue(value)}
                  value={radioValue}
                >
                  <ToggleButton icon="format-bold" value="bold" />
                  <ToggleButton icon="format-italic" value="italic" />
                  <ToggleButton icon="format-underline" value="underline" />
                </ToggleButton.Row>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Progress y Loading" />
          <Card.Content>
            <View style={{ gap: 16 }}>
              <View>
                <Text>Progress Bar</Text>
                <ProgressBar progress={0.7} color="#6200ee" />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <Text>Activity Indicator</Text>
                <ActivityIndicator animating={true} />
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Listas" />
          <Card.Content>
            <List.Section>
              <List.Item
                title="Elemento 1"
                description="Descripción del elemento 1"
                left={(props) => <List.Icon {...props} icon="folder" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
              <List.Item
                title="Elemento 2"
                description="Descripción del elemento 2"
                left={(props) => <List.Icon {...props} icon="file" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
            </List.Section>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Data Table" />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Nombre</DataTable.Title>
                <DataTable.Title numeric>Edad</DataTable.Title>
                <DataTable.Title numeric>Puntuación</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>Juan</DataTable.Cell>
                <DataTable.Cell numeric>25</DataTable.Cell>
                <DataTable.Cell numeric>95</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>María</DataTable.Cell>
                <DataTable.Cell numeric>30</DataTable.Cell>
                <DataTable.Cell numeric>87</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>

        <Surface style={{ padding: 16, marginBottom: 16, elevation: 2 }}>
          <Title>Surface Component</Title>
          <Paragraph>
            Este es un componente Surface que proporciona elevación y sombreado
            siguiendo las directrices de Material Design.
          </Paragraph>
        </Surface>

        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
          <Button 
            mode="contained" 
            onPress={() => setSnackVisible(true)}
          >
            Mostrar Snackbar
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => setDialogVisible(true)}
          >
            Mostrar Dialog
          </Button>
        </View>

        <Divider />
      </View>

      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={() => setSnackVisible(true)}
      />

      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={3000}
        action={{
          label: 'Deshacer',
          onPress: () => {},
        }}
      >
        ¡Acción realizada con éxito!
      </Snackbar>
    </ScrollView>
  );
}
