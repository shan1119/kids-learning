brew tap mongodb/brew
brew install mongodb-community@4.2
brew services start mongodb-community@4.2

1.
template { id: 1, name: "Jan", visible: "true", description: "January Test", formular:[formular,...] }
    (id), name, visible, description
    (1),    Jan,   true, January Test
    (2),    Feb,   true, February Test

formular { templateid: 1, id: 1, formular: "generate2(1)" }
    (templateid, id),  formular
    (         1,  1),  generate2(1)
    (         1,  2),  generate2(1)
    (         1,  3),  generate2(1)
    (         1,  4),  generate2(2)
    (         1,  5),  generate2(2)
    (         1,  6),  generate2(2)
    (         1,  7),  generate3(1)
    (         1,  8),  generate3(2)
    (         1,  9),  generate3(3)
    (         1, 10),  generate3(4)
    (         2,  1),  generate2(1)
              ...          ...
    (         2, 10),  generate3(4)

2.
instance { id: 1, templateid: 1, createTime: "2020/03/29 00:00:00", details: [instanceDetail,...]}
    (id), templateid, createTime
    (1),           1, 
    (2),           2, 
instanceDetail { id: 1,formularid: 1,formular: ["1", "+", "2", "=", "3"],qid: 2,answer: 3 }
    (id, formularid),  qid, answer             qid:1 -> for Question/Answer index
    ( 1,          1),    1,   240
    ( 1,          2),    1,   240
    ( 1,          3),    1,   240
    ( 1,          4),    1,   240
    ( 1,          5),    1,   240
     ...                            ...

3.
history { id: 1, instanceid: 1, point: 100, cost: "01:30", yourAnswer: [] }
    (id), instanceid, point, cost
    (1),           1,   100,   01:30

historyDetail { id: 1, formularid: 1, yourAnswer: "3" }
    (id, formularid),  yourAnswer
    ( 1,          1),     240
    ( 1,          2),     240
    ( 1,          3),     240
    ( 1,          4),     240
    ( 1,          5),     240
    ( 1,          6),     240
    ( 1,          7),     240
    ( 1,          8),     240
    ( 1,          9),     240
    ( 1,          10),    240
    ...             ...
    