import "./App.style.scss";
import React from "react";
import arrowBack from './assets/images/arrowBack.svg'
import arrowDown from './assets/images/arrowDown.svg'
import {ThemeProvider, createTheme, ThemeOptions} from "@mui/material/styles";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    AppBar,
    Toolbar,
    Typography,
    Box
} from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
        mode: "dark",
        background: {
            default: "#202124",  // Фон для всего контента
            paper: "#202124",    // Фон для элементов вроде карточек
        },
    },
};

const darkTheme = createTheme(themeOptions);

const menuItems = ["Объекты", "РД", "МТО", "СМР", "График", "Бюджет", "Камеры"];

const treeData = [
    {
        id: "1",
        name: "Южная строительная площадка",
        children: [
            {
                id: "2",
                name: "Фундаментальные работы",
                children: [
                    {id: "3", name: "Статья работы №1"},
                    {id: "4", name: "Статья работы №2"},
                ],
            },
        ],
    },
];

export default function TreeTable() {
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="app-container">
                <AppBar position="fixed" className="header">
                    <Toolbar className="header-top">
                        <Typography component="button" className="typography">Просмотр</Typography>
                        <Typography component="button" className="typography">Управление</Typography>
                    </Toolbar>
                    <Toolbar className="header-bottom">
                        <div className="header-bottom-content">
                            <div className="header-bottom-arrow">
                            <Typography className="typography">
                                Название проекта
                            </Typography>
                            <Typography className="typography2">
                                Аббревиатура
                            </Typography>
                            </div>
                            <img className="arrow-down" src={arrowDown} alt="arrowDown"/>
                        </div>
                        <Typography className="header-bottom-content2">Строительно-монтажные работы</Typography>
                    </Toolbar>
                </AppBar>

                <div className="main-content">
                    <Drawer
                        variant="permanent"
                        className="drawer"
                    >
                        <List>
                            {menuItems.map((text, index) => (
                                <ListItem className="list-item" button key={index}>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>

                    <Box className="content">
                        <div className="header-spacer"></div>
                        <TableContainer component={Paper} className="table-container">
                            <Table style={{backgroundColor: "#202124"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Уровень</TableCell>
                                        <TableCell>Наименование работ</TableCell>
                                        <TableCell>Основная з/п</TableCell>
                                        <TableCell>Оборудование</TableCell>
                                        <TableCell>Накладные расходы</TableCell>
                                        <TableCell>Сметная прибыль</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {treeData.map((node) => (
                                        <React.Fragment key={node.id}>
                                            <TableRow>
                                                <TableCell>1</TableCell>
                                                <TableCell>{node.name}</TableCell>
                                                <TableCell>20 348</TableCell>
                                                <TableCell>1 750</TableCell>
                                                <TableCell>108,07</TableCell>
                                                <TableCell>1 709 172,5</TableCell>
                                            </TableRow>
                                            {node.children?.map((child) => (
                                                <React.Fragment key={child.id}>
                                                    <TableRow>
                                                        <TableCell>2</TableCell>
                                                        <TableCell style={{paddingLeft: 20}}>{child.name}</TableCell>
                                                        <TableCell>20 348</TableCell>
                                                        <TableCell>1 750</TableCell>
                                                        <TableCell>108,07</TableCell>
                                                        <TableCell>189 172,5</TableCell>
                                                    </TableRow>
                                                    {child.children?.map((subChild) => (
                                                        <TableRow key={subChild.id} sx={{border: "blue"}}>
                                                            <TableCell>3</TableCell>
                                                            <TableCell
                                                                style={{paddingLeft: 40}}>{subChild.name}</TableCell>
                                                            <TableCell>38 200</TableCell>
                                                            <TableCell>1 200</TableCell>
                                                            <TableCell>8,50</TableCell>
                                                            <TableCell>1 020 000</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>
        </ThemeProvider>
    );
}
