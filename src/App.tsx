import "./App.style.scss";
import React, {useState, useRef, useEffect} from "react";
import arrowBack from "./assets/images/arrowBack.svg";
import icon from "./assets/images/icon.svg";
import arrowDown from "./assets/images/arrowDown.svg";
import doc from "./assets/images/doc.svg";
import trashFill from "./assets/images/trashFill.svg";
import vector from "./assets/images/vector.svg";
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
    Box,
    TextField
} from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
        mode: "dark",
        background: {
            default: "#202124",
            paper: "#202124",
        },
    },
};

const darkTheme = createTheme(themeOptions);
const menuItems = ["Объекты", "РД", "МТО", "СМР", "График", "Бюджет", "Камеры"];

const initialTreeData = [
    {
        id: "1",
        name: "Южная строительная площадка",
        children: [
            {
                id: "2",
                name: "Фундаментальные работы",
                children: [
                    {id: "3", name: "Статья работы №1", children: []},
                    {id: "4", name: "Статья работы №2", children: []},
                ],
            },
        ],
    },
];

export default function TreeTable() {
    const [treeData, setTreeData] = useState(initialTreeData);
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [hoveredId, setHoveredId] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (editingId !== null) {
            const handleClickOutside = (event) => {
                if (inputRef.current && !inputRef.current.contains(event.target)) {
                    stopEditing(); // Завершаем редактирование, если клик был вне инпута
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [editingId]);

    const addNode = (parentId) => {
        setTreeData((prevTree) => {
            const newId = Date.now().toString();
            const newNode = {id: newId, name: `Новая статья`, children: []};

            const addChild = (nodes) => {
                return nodes.map((node) => {
                    if (node.id === parentId) {
                        return {...node, children: [...node.children, newNode]};
                    }
                    if (node.children) {
                        return {...node, children: addChild(node.children)};
                    }
                    return node;
                });
            };

            return addChild(prevTree);
        });
    };

    const startEditing = (id, name) => {
        setEditingId(id);
        setEditValue(name);
    };

    const stopEditing = () => {
        setTreeData((prevTree) => {
            const updateNode = (nodes) => {
                return nodes.map((node) => {
                    if (node.id === editingId) {
                        return {...node, name: editValue};
                    }
                    if (node.children) {
                        return {...node, children: updateNode(node.children)};
                    }
                    return node;
                });
            };
            return updateNode(prevTree);
        });
        setEditingId(null);
    };

    const deleteNode = (id) => {
        setTreeData((prevTree) => {
            const removeNode = (nodes) => {
                return nodes
                    .filter((node) => node.id !== id) // Удаляем узел
                    .map((node) => ({
                        ...node,
                        children: removeNode(node.children), // Рекурсивно удаляем из потомков
                    }));
            };

            return removeNode(prevTree);
        });
    };

    const renderTree = (nodes, level = 0) => {
        return nodes.map((node) => {
            const hasChildren = node.children && node.children.length > 0;
            return (
                <React.Fragment key={node.id}>
                    <TableRow
                        className="tree-row"
                        onDoubleClick={() => startEditing(node.id, node.name)}
                    >
                        <TableCell style={{paddingLeft: level * 30}} className="tree-cell">
                            {editingId !== node.id && (<div className="tree-connector"
                                                            onMouseEnter={() => setHoveredId(node.id)}
                                                            onMouseLeave={() => setHoveredId(null)}
                            >
                                <img
                                    className="menu-img"
                                    src={doc}
                                    alt="doc"
                                    onClick={() => addNode(node.id)}
                                    style={{cursor: "pointer"}}
                                />
                                {hoveredId === node.id && (
                                    <img
                                        className="menu-img"
                                        src={trashFill}
                                        alt="trash"
                                        onClick={() => deleteNode(node.id)}
                                        style={{cursor: "pointer"}}
                                    />
                                )}
                            </div>)}
                        </TableCell>
                        <TableCell>
                            {editingId === node.id ? (
                                <TextField
                                    value={editValue}
                                    inputRef={inputRef}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onBlur={stopEditing}
                                    fullWidth
                                    color="grey"
                                    size="small"
                                    className="text-field"
                                />
                            ) : (
                                node.name
                            )}
                        </TableCell>
                        <TableCell>20 348</TableCell>
                        <TableCell>1 750</TableCell>
                        <TableCell>108,07</TableCell>
                        <TableCell>1 709 172,5</TableCell>
                    </TableRow>
                    {hasChildren && renderTree(node.children, level + 1)}
                </React.Fragment>
            );
        });
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="app-container">
                <AppBar position="fixed" className="header">
                    <Toolbar className="header-top">
                        <img className="top-menu-img" src={icon} alt="icon"/>
                        <img className="top-menu-img" src={arrowBack} alt="arrowBack"/>
                        <Typography component="button" className="typography">Просмотр</Typography>
                        <Typography component="button" className="typography">Управление</Typography>
                    </Toolbar>
                    <Toolbar className="header-bottom">
                        <div className="header-bottom-content">
                            <div className="header-bottom-arrow">
                                <Typography className="typography">Название проекта</Typography>
                                <Typography className="typography2">Аббревиатура</Typography>
                            </div>
                            <img className="arrow-down" src={arrowDown} alt="arrowDown"/>
                        </div>
                        <Typography className="header-bottom-content2">Строительно-монтажные работы</Typography>
                    </Toolbar>
                </AppBar>
                <div className="main-content">
                    <Drawer variant="permanent" className="drawer">
                        <List>
                            {menuItems.map((text, index) => (
                                <ListItem className="list-item" button key={index}>
                                    <img className="left-menu-img" src={vector} alt="vector"/>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <Box className="content">
                        <TableContainer component={Paper} className="table-container">
                            <Table>
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
                                <TableBody>{renderTree(treeData)}</TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>
        </ThemeProvider>
    );
}
