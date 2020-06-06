module.exports = {
    getService: function (serviceName) {
        var svc;

        if (serviceName == 'RightGarageDoorTrigger')
            svc = { id: 1, svcName: 'RightGarageDoorTrigger', nodeId: 201, api: 'api/relays/', pin: '24/', act: 'flipValueWithTimeout/', arg: '1000', argDesc: 'Timeout' };
        else if (serviceName == 'LeftGarageDoorTrigger')
            svc = { id: 2, svcName: 'LeftGarageDoorTrigger', nodeId: 201, api: 'api/relays/', pin: '23/', act: 'flipValueWithTimeout/', arg: '1000', argDesc: 'Timeout' };
        else if (serviceName == 'GaragePing')
            svc = { id: 3, svcName: 'GaragePing', nodeId: 201, api: 'api/ping', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'RightGarageDoorStatus')
            svc = { id: 4, svcName: 'RightGarageDoorStatus', nodeId: 202, api: 'api/garageDoorStatus', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'LeftGarageDoorStatus')
            svc = { id: 5, svcName: 'LeftGarageDoorStatus', nodeId: 203, api: 'api/garageDoorStatus', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'RightGarageDoorPing')
            svc = { id: 6, svcName: 'RightGarageDoorPing', nodeId: 202, api: 'api/ping', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'LeftGarageDoorPing')
            svc = { id: 7, svcName: 'LeftGarageDoorPing', nodeId: 203, api: 'api/ping', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'Temp')
            svc = { id: 8, svcName: 'Temp', nodeId: 3, api: 'api/temp', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'Light')
            svc = { id: 9, svcName: 'Light', nodeId: 3, api: 'api/light', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'EnviroPing')
            svc = { id: 10, svcName: 'SensorPing', nodeId: 4, api: 'api/ping', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'EnviroTemp')
            svc = { id: 11, svcName: 'EnviroTemp', nodeId: 4, api: 'api/temp', pin: '', act: '', arg: '', argDesc: '' };
        else if (serviceName == 'EnviroLight')
            svc = { id: 12, svcName: 'EnviroLight', nodeId: 4, api: 'api/light', pin: '', act: '', arg: '', argDesc: '' };

        return svc;
    },
    getNodeById: function (nodeId) {
        var node;

        if (nodeId == 101)
            node = { id: 101, serverName: 'ubuntu01', protocol: 'http://', ipAddress: '192.168.0.101', port: ':3000/' };
        else if (nodeId == 102)
            node = { id: 102, serverName: 'ubuntu02', protocol: 'http://', ipAddress: '192.168.0.102', port: ':3000/' };
        else if (nodeId == 201)
            node = { id: 201, serverName: 'pi01', protocol: 'http://', ipAddress: '192.168.0.201', port: ':3000/' };
        else if (nodeId == 202)
            node = { id: 202, serverName: 'pi02z', protocol: 'http://', ipAddress: '192.168.0.202', port: ':3000/' };
        else if (nodeId == 203)
            node = { id: 203, serverName: 'pi03z', protocol: 'http://', ipAddress: '192.168.0.203', port: ':3000/' };

        return node;
    },
    getNodeByServerName: function (name) {
        var node;

        if (name == 'ubuntu01')
            node = getNodeById(101);
        else if (name == 'ubuntu02')
            node = getNodeById(102);
        else if (name == 'pi01')
            node = getNodeById(201);
        else if (name == 'piz02')
            node = getNodeById(202);

        return node;
    }
};
//var dblite = require('dblite');
//var db = dblite('commandcenter.db');

//function initialize() {
//    db.query('DROP TABLE IF EXISTS Svc;');
//    db.query('DROP TABLE IF EXISTS Node;');
//    db.query('CREATE TABLE IF NOT EXISTS Node (id INTEGER PRIMARY KEY, serverName TEXT, protocol TEXT, ipAddress TEXT	port TEXT);');
//    db.query('CREATE TABLE IF NOT EXISTS Svc(id INTEGER PRIMARY KEY, svcName TEXT, nodeId INTEGER, api TEXT, pin TEXT, act TEXT, arg TEXT, argDesc TEXT, CONSTRAINT Svc_fk_nodeId FOREIGN KEY (nodeId) REFERENCES Node (id) ON UPDATE CASCADE ON DELETE CASCADE);');
//    db.query("INSERT INTO Node (id, serverName, protocol, ipAddress, port) VALUES (1, 'pi0', 'http://', '192.168.0.107', ':3000/');");
//    db.query("INSERT INTO Node (id, serverName, protocal, ipAddress, port) VALUES (2, 'pi1', 'http://', '127.0.0.1', ':3000/');");
//    db.query("INSERT INTO Node (id, serverName, protocol, ipAddress, port) VALUES (@id, '@serverName, @protocol, @ipAddress, @port);", { id: 3, serverName: 'pi2', protocol: 'http://', ipAddress: '192.168.0.134', port: ':3000/' });
//    db.query("INSERT INTO Node (id, serverName, protocol, ipAddress, port) VALUES (4, 'pi3', 'http://', '127.0.0.1', ':3000/');");
//    db.query("INSERT INTO Svc (id, svcName, nodeId, api, pin, act, arg, argDesc) VALUES (1, 'Ping', 3, 'ping', 23, '', '', '');");
//    db.query("INSERT INTO Svc (id, svcName, nodeId, api, pin, act, arg, argDesc) VALUES (2, 'RightGarageDoor', 3, 'relays/', 23, 'flipValueWithTimeout', '1000', 'Timeout value');");
//    db.query("INSERT INTO Svc (id, svcName, nodeId, api, pin, act, arg, argDesc) VALUES (3, 'LeftGarageDoor', 3, 'relays', 24, 'flipValueWithTimeout', '1000', 'Timeout value');");
//    db.query('INSERT INTO test VALUES(null, ?)', ['some text']);
//}
