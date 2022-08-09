const {estateSuggest} = require('./trie');

describe("Trie root node",() =>{
    test('Root node key property is null', () =>{
        expect(estateSuggest.root.key).toBe(null);
    });
    test('Root node parent property is null', () =>{
        expect(estateSuggest.root.parent).toBe(null);
    });
    test('Root node children property is an empty object', () =>{
        expect(Object.getPrototypeOf(estateSuggest.root.children)).toBe(Object.prototype)
        expect(Object.keys(estateSuggest.root.children).length).toBe(0);
    });
    test('Root node end property is false', () =>{
        expect(estateSuggest.root.end).toBe(false);
    });
});

test("Trie converts all letters in words to lower case", () =>{
    estateSuggest.insert("TeSt", 'test word', "link/to/word");
    expect(estateSuggest.root.children.t.key).toBe('t');
    expect(estateSuggest.root.children.t.children.e.key).toBe('e');
    expect(estateSuggest.root.children.t.children.e.children.s.key).toBe('s');
    expect(estateSuggest.root.children.t.children.e.children.s.children.t.key).toBe('t');
});

describe("Firts node of a trie", () =>{
     beforeAll(() => estateSuggest.insert("test", 'test word', "link/to/word"));
    test("First node has key property", () =>{
        expect(estateSuggest.root.children.t.key).toBe('t');
    });
    test("First node has root node as is parent", () =>{
        expect(estateSuggest.root.children.t.parent).toBe(estateSuggest.root);
    });
    test("First node has as children an object with length >= 1", () =>{
        expect(Object.getPrototypeOf(estateSuggest.root.children.t.children)).toBe(Object.prototype)
        expect(Object.keys(estateSuggest.root.children.t.children).length).toBe(1);
        expect(estateSuggest.root.children.t.children.e.key).toBe('e');
    });
    test("First node has end property equal to false", () =>{
        expect(estateSuggest.root.children.t.end).toBe(false);
    });
});

describe("Last node of a trie", () =>{
     beforeAll(() => estateSuggest.insert("test", "test word", "link/to/word"));
    test("First node has key property", () =>{
        expect(estateSuggest.root.children.t.children.e.children.s.children.t.key).toBe('t');
    });
    test("Last node has another node as is parent", () =>{
        expect(estateSuggest.root.children.t.children.e.children.s.children.t.parent).toBe(estateSuggest.root.children.t.children.e.children.s);
    });
    test("Last node has no children", () =>{
        expect(Object.getPrototypeOf(estateSuggest.root.children.t.children.e.children.s.children.t.children)).toBe(Object.prototype)
        expect(Object.keys(estateSuggest.root.children.t.children.e.children.s.children.t.children).length).toBe(0);
    });
    test("Last node has end property equal to true", () =>{
        expect(estateSuggest.root.children.t.children.e.children.s.children.t.end).toBe(true);
    });
    test("First node has name property equal to an 'test word'", () =>{
        expect(estateSuggest.root.children.t.children.e.children.s.children.t.name).toBe("test word");
    });
    test("First node has name property equal to 'link/to/word'", () =>{
        expect(estateSuggest.root.children.t.children.e.children.s.children.t.link).toBe("link/to/word");
    });
});

describe("Node with many children", () =>{
    beforeAll(() => {
        estateSuggest.insert("Lantern", "Lantern St", "link/to/Lanter St");
        estateSuggest.insert("Lamda", "Lambda rd", "link/to/Lambda rd");
        estateSuggest.insert("Linder", "Linder Av", "link/to/Lindel Av");
    });
    test("First node has 2 children", () =>{
        expect(Object.getPrototypeOf(estateSuggest.root.children.l.children)).toBe(Object.prototype)
        expect(Object.keys(estateSuggest.root.children.l.children).length).toBe(2);
        expect(estateSuggest.root.children.l.children.a.key).toBe('a');
        expect(estateSuggest.root.children.l.children.i.key).toBe('i');
    });
    test("Second node has 2 children", () => {
        expect(Object.getPrototypeOf(estateSuggest.root.children.l.children.a.children)).toBe(Object.prototype)
        expect(Object.keys(estateSuggest.root.children.l.children.a.children).length).toBe(2);
        expect(estateSuggest.root.children.l.children.a.children.n.key).toBe('n');
        expect(estateSuggest.root.children.l.children.a.children.m.key).toBe('m');
    });
});

// describe("Search", () =>{
//     beforeAll(() => {
//         estateSuggest.insert("Lantern", "Lantern St", "link/to/Lanter St");
//         estateSuggest.insert("Lamda", "Lambda rd", "link/to/Lambda rd");
//         estateSuggest.insert("Linder", "Linder Av", "link/to/Lindel Av");
//     });
    
//     // test("Search converts all letters in words to lower case", () =>{
//     //     expect(estateSuggest.find('lAnTErN'))
//     // });
// });