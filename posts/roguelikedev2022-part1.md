---
title: "RoguelikeDev Does The Complete Roguelike Tutorial"
date: "2022-06-08"
---

For the past two years, I've been taking part in this yearly event where a bunch of developers get together a go through a roguelike tutorial to create a (bare-bones) game. This year, [it kicked off today](https://old.reddit.com/r/roguelikedev/comments/vm9yam/roguelikedev_does_the_complete_roguelike_tutorial/). Last year, [I used WebAssembly](https://github.com/lagdotcom/wasmrogue), and the year before [I used Forth](https://github.com/lagdotcom/forth-rogue). I'd like to up the ante this time and use _my own language that I write from scratch_.

# Language Ideas

I want the language to have a friendly syntax, have a builtin ECS, be geared towards creating roguelikes, but be more than a "game construction kit". I'll break that down into more detail:

- **friendly syntax**: I grew up with BASIC and C-family languages, but I also enjoy Forth's minimalist syntax and Lua's more explicit way of doing things. I'm undecided how this is going to look, but I'll probably end up with something like C.
- **builtin ECS**: An [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system) is a way of organising code. While it's by no means limited to game development (or roguelikes) it is a popular way of looking at the highly dynamic worlds that roguelikes tend to have. I'll be making Entities, Components and Systems all first-class objects in my language.
- **good for roguelikes**: I'm referring to "traditional roguelikes" here, that is, text-based turn-based RPGs. I'll implement as many features in the language itself as I can so that the code won't have to do all the boring stuff every time.
- **more than a construction kit**: The main goal will be to create a roguelike (and hopefully inspire others to use the language?) but I would also like the language to be expressive and powerful enough to allow writing other kinds of games or replacing core algorithms without having to hack the language itself.

I've decided on one thing already: the language won't be compiled, at least at first. My plan is for the language to transpile to JavaScript so it can be embedded as a game into a webpage very easily. However, I will try to make the architecture generic enough so that any kind of "backend driver" could be written in case I wanted the tools to be able to produce native applications. This is sort of similar to what [LLVM](https://clang.llvm.org) does.

# Week 1

This week is mainly about getting your environment set up and moving that all-important `@` around, so it's usually pretty simple. For me, it won't be... I have to design a language from scratch, write a parser, write the game code, then write some kind of driver that lets the code execute! In classic top-down fashion, here's roughly what I want the code to look like:

```rl
component Appearance
  ch: char
  fg: string
  bg: string
end

component OldPosition
  x: int
  y: int
end

component Position
  x: int
  y: int
end

component MoveAction
  x: int
  y: int
end

tag IsPlayer

system onKey(e: entity, IsPlayer, k: KeyEvent)
  e.add(match k.key
    'up'    = MoveAction( 0, -1)
    'right' = MoveAction( 1,  0)
    'down'  = MoveAction( 0,  1)
    'left'  = MoveAction(-1,  0)
  end)
end

system movement(e: entity, p: Position, m: MoveAction)
  e.add(OldPosition(p.x, p.y))
  p.x += m.x
  p.y += m.y
  e.remove(a)
end

system draw(e: entity, a: Appearance,
            o: OldPosition, p: Position)
  draw(o.x, o.y, ' ')

  e.remove(o)
  draw(p.x, p.y, a.ch, a.fg, a.bg)
end

fn main()
  setSize(80, 50)
  e: entity = spawn(IsPlayer,
    Appearance('@', 'white', 'black'),
    Position(40, 25),
    ; this is to make sure that draw() is called
    OldPosition(40, 25)
  )
  pushKeyHandler(onKey)
end
```

If you've written any Lua then this syntax should look pretty familiar. It's a mix of that and the kind of type annotation that TypeScript allows. We'll see how long it takes to irritate me enough into changing it. From this listing I can pick out the following things to implement:

- Most obviously I need a **parser**. My current language slice needs:
  - _top level declarations_: `component`, `tag`, `system`, `fn`
  - _statements_: function calls, `match`, assignments (`=` and `+=`)
  - _data types_: `entity`, defined `component` structures, `char`, `int`, `string`
  - `name: type` pairs
  - member access by chaining with `.`
  - comments with `;`
- A **driver** that will take the syntax tree that the parser outputs:
  - _global implementations_: `draw`, `setSize`, `spawn`, `pushKeyHandler`
  - _member implementations_: `Entity.add`, `Entity.remove`, `component.new`
  - The actual frontend/wrapper that will execute the transpiled JavaScript

It's a lot to do, and I have a week. I will also have quite a few hours to think about it, as I'm going to be on a plane for most of tomorrow...
