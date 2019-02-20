﻿# Python Tools for Visual Studio
# Copyright(c) Microsoft Corporation
# All rights reserved.
# 
# Licensed under the Apache License, Version 2.0 (the License); you may not use
# this file except in compliance with the License. You may obtain a copy of the
# License at http://www.apache.org/licenses/LICENSE-2.0
# 
# THIS CODE IS PROVIDED ON AN  *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY
# IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
# MERCHANTABLITY OR NON-INFRINGEMENT.
# 
# See the Apache Version 2.0 License for specific language governing
# permissions and limitations under the License.

__author__ = "Microsoft Corporation <ptvshelp@microsoft.com>"
__version__ = "15.8"

# Special stub file for the typing module
# This must have no imports (besides builtins),
# and can use simple code to define object semantics.

Any = object()
TypeVar = object()
TYPE_CHECKING : bool = ...

# Functions
def overload(fn): return f
def no_type_check(fn): return fn
def get_type_hints(obj, globalns: Dict[str, Any] = ..., localns: Dict[str, Any] = ...) -> Dict[str, Any]: ...
def cast(tp : Callable[[], Any], obj: Any): return tp()

def NewType(name: str, tp: Type): return tp()

# Types with special handling
class Generic: pass
class Protocol: pass
class Callable: pass
class Type: pass
class ClassVar: pass
class NamedTuple: pass
class GenericMeta: pass
class TypeAlias: pass
class Union: pass
class Optional: pass
class Iterable: pass
class Iterator: pass
class Generator: pass
class Awaitable: pass
class Coroutine: pass
class AwaitableGenerator: pass
class AsyncIterable: pass
class AsyncIterator: pass
class AsyncGenerator: pass
class MappingView: pass
class ItemsView: pass
class KeysView: pass
class ValuesView: pass
class NoReturn: pass
class Tuple: pass
class List: pass
class Dict: pass
class Set: pass
class ByteString: pass

# Close enough aliases for our purposes
Collection = Sequence = MutableSequence = List
ChainMap = DefaultDict = Mapping = MutableMapping = Dict
FrozenSet = AbstractSet = MutableSet = Set

Text = str

AnyStr = str
if sys.version_info >= (3, 0):
    AnyStr = bytes
else:
    AnyStr = unicode

# Subclasses of built in types
class Counter(dict):
    def most_common(self, n : int = None) -> List[Tuple[Any, int]]: ...

class Deque(list):
    def extend(self, iterable : Iterable): ...
    def extendleft(self, iterable : Iterable): ...
    def rotate(self, n : int = 1): ...


class SupportsInt:
    def __int__(self) -> int: ...

class SupportsFloat:
    def __float__(self) -> float: ...

class SupportsComplex:
    def __complex__(self) -> complex: ...

class SupportsBytes:
    def __bytes__(self) -> bytes: ...

class SupportsAbs:
    def __abs__(self): return self

class SupportsRound:
    def __round__(self, ndigits: int = ...): return self

class Reversible:
    def __reversed__(self): return iter(self)

class Sized:
    def __len__(self) -> int: ...

class Hashable:
    def __hash__(self) -> int: ...

class Container:
    def __contains__(self, x: object) -> bool: ...


class ContextManager:
    def __enter__(self): return self
    def __exit__(self, exc_type: Type, exc_value: BaseException, traceback: TracebackType) -> bool: ...

class AsyncContextManager:
    def __aenter__(self) -> Awaitable: ...
    def __aexit__(self, exc_type: Type, exc_value: BaseException, traceback: TracebackType) -> Awaitable: ...

class IO:
    mode : str = ...
    name : str = ...
    closed : bool = ...

    def close(self): ...
    def detach(self) -> IO: ...
    def fileno(self) -> int: ...
    def flush(self): ...
    def isatty(self) -> bool: ...
    def read(self, n: int = ...) -> AnyStr: ...
    def readable(self) -> bool: ...
    def readline(self, limit: int = ...) -> AnyStr: ...
    def readlines(self, hint: int = ...) -> List[AnyStr]: ...
    def seek(self, offset: int, whence: int = ...) -> int: ...
    def seekable(self) -> bool: ...
    def tell(self) -> int: ...
    def truncate(self, size: Optional[int] = ...) -> int: ...
    def writable(self) -> bool: ...
    def write(self, s: AnyStr) -> int: ...
    def writelines(self, lines: Iterable[AnyStr]) -> None: ...

    def __next__(self) -> AnyStr: ...
    def __iter__(self) -> Iterator[AnyStr]: return self
    def __enter__(self): return self
    def __exit__(self, t: Optional[Type[BaseException]], value: Optional[BaseException],
                 traceback: Optional[TracebackType]) -> bool: ...

class BinaryIO(IO):
    def read(self, n: int = ...) -> bytes: ...
    def readline(self, limit: int = ...) -> bytes: ...
    def readlines(self, hint: int = ...) -> List[bytes]: ...
    def write(self, s: Union[bytes, bytearray]) -> int: ...

class TextIO(IO):
    buffer : BinaryIO = ...
    encoding : str = ...
    errors : str = ...
    line_buffering : int = ...
    newlines : Union[str, tuple] = ...

class Match:
    pos = 0
    endpos = 0
    lastindex = 0
    lastgroup : AnyStr = ... 
    string : AnyStr = ...
    re : Pattern = ...
    def expand(self, template: AnyStr) -> AnyStr: ...

    def group(self, group1: int = ...) -> AnyStr: ...
    def group(self, group1: str) -> AnyStr: ...
    def group(self, group1: int, group2: int, *groups: int) -> Sequence[AnyStr]: ...
    def group(self, group1: str, group2: str, *groups: str) -> Sequence[AnyStr]: ...

    def groups(self, default: AnyStr = ...) -> Sequence[AnyStr]: ...
    def groupdict(self, default: AnyStr = ...) -> Dict[str, AnyStr]: ...
    def start(self, group: Union[int, str] = ...) -> int: ...
    def end(self, group: Union[int, str] = ...) -> int: ...
    def span(self, group: Union[int, str] = ...) -> Tuple[int, int]: ...
    def __getitem__(self, g: Union[int, str]) -> AnyStr: ...

class Pattern:
    flags = 0
    groupindex : Mapping[str, int] = ...
    groups = 0
    pattern : AnyStr = ...

    def search(self, string: AnyStr, pos: int = ...,
               endpos: int = ...) -> Match: ...
    def match(self, string: AnyStr, pos: int = ...,
              endpos: int = ...) -> Match: ...
    def fullmatch(self, string: AnyStr, pos: int = ...,
                  endpos: int = ...) -> Match: ...
    def split(self, string: AnyStr, maxsplit: int = ...) -> List[AnyStr]: ...
    def findall(self, string: AnyStr, pos: int = ...,
                endpos: int = ...) -> List[AnyStr]: ...
    def finditer(self, string: AnyStr, pos: int = ...,
                 endpos: int = ...) -> Iterator[Match]: ...

    def sub(self, repl: AnyStr, string: AnyStr, count: int = ...) -> AnyStr: ...
    def sub(self, repl: Callable[[Match], AnyStr], string: AnyStr, count: int = ...) -> AnyStr: ...

    def subn(self, repl: AnyStr, string: AnyStr, count: int = ...) -> Tuple[AnyStr, int]: ...
    def subn(self, repl: Callable[[Match], AnyStr], string: AnyStr, count: int = ...) -> Tuple[AnyStr, int]: ...
