# encoding: utf-8
# module ossaudiodev
# from /usr/lib/python3.6/lib-dynload/ossaudiodev.cpython-36m-x86_64-linux-gnu.so
# by generator 1.146
# no doc
# no imports

# Variables with simple values

AFMT_AC3 = 1024

AFMT_A_LAW = 2

AFMT_IMA_ADPCM = 4

AFMT_MPEG = 512

AFMT_MU_LAW = 1

AFMT_QUERY = 0

AFMT_S16_BE = 32
AFMT_S16_LE = 16
AFMT_S16_NE = 16

AFMT_S8 = 64

AFMT_U16_BE = 256
AFMT_U16_LE = 128

AFMT_U8 = 8

SNDCTL_COPR_HALT = 3222553351
SNDCTL_COPR_LOAD = 3484435201
SNDCTL_COPR_RCODE = 3222553347
SNDCTL_COPR_RCVMSG = 2409906953
SNDCTL_COPR_RDATA = 3222553346
SNDCTL_COPR_RESET = 17152
SNDCTL_COPR_RUN = 3222553350
SNDCTL_COPR_SENDMSG = 3483648776
SNDCTL_COPR_WCODE = 1075069701
SNDCTL_COPR_WDATA = 1075069700

SNDCTL_DSP_BIND_CHANNEL = 3221508161

SNDCTL_DSP_CHANNELS = 3221508102
SNDCTL_DSP_GETBLKSIZE = 3221508100
SNDCTL_DSP_GETCAPS = 2147766287
SNDCTL_DSP_GETCHANNELMASK = 3221508160
SNDCTL_DSP_GETFMTS = 2147766283
SNDCTL_DSP_GETIPTR = 2148290577
SNDCTL_DSP_GETISPACE = 2148552717
SNDCTL_DSP_GETODELAY = 2147766295
SNDCTL_DSP_GETOPTR = 2148290578
SNDCTL_DSP_GETOSPACE = 2148552716
SNDCTL_DSP_GETSPDIF = 2147766339
SNDCTL_DSP_GETTRIGGER = 2147766288
SNDCTL_DSP_MAPINBUF = 2148552723
SNDCTL_DSP_MAPOUTBUF = 2148552724
SNDCTL_DSP_NONBLOCK = 20494
SNDCTL_DSP_POST = 20488
SNDCTL_DSP_PROFILE = 1074024471
SNDCTL_DSP_RESET = 20480
SNDCTL_DSP_SAMPLESIZE = 3221508101
SNDCTL_DSP_SETDUPLEX = 20502
SNDCTL_DSP_SETFMT = 3221508101
SNDCTL_DSP_SETFRAGMENT = 3221508106
SNDCTL_DSP_SETSPDIF = 1074024514
SNDCTL_DSP_SETSYNCRO = 20501
SNDCTL_DSP_SETTRIGGER = 1074024464
SNDCTL_DSP_SPEED = 3221508098
SNDCTL_DSP_STEREO = 3221508099
SNDCTL_DSP_SUBDIVIDE = 3221508105
SNDCTL_DSP_SYNC = 20481

SNDCTL_FM_4OP_ENABLE = 1074024719

SNDCTL_FM_LOAD_INSTR = 1076384007

SNDCTL_MIDI_INFO = 3228848396
SNDCTL_MIDI_MPUCMD = 3223416066
SNDCTL_MIDI_MPUMODE = 3221515521
SNDCTL_MIDI_PRETIME = 3221515520

SNDCTL_SEQ_CTRLRATE = 3221508355
SNDCTL_SEQ_GETINCOUNT = 2147766533
SNDCTL_SEQ_GETOUTCOUNT = 2147766532
SNDCTL_SEQ_GETTIME = 2147766547
SNDCTL_SEQ_NRMIDIS = 2147766539
SNDCTL_SEQ_NRSYNTHS = 2147766538
SNDCTL_SEQ_OUTOFBAND = 1074286866
SNDCTL_SEQ_PANIC = 20753
SNDCTL_SEQ_PERCMODE = 1074024710
SNDCTL_SEQ_RESET = 20736
SNDCTL_SEQ_RESETSAMPLES = 1074024713
SNDCTL_SEQ_SYNC = 20737
SNDCTL_SEQ_TESTMIDI = 1074024712
SNDCTL_SEQ_THRESHOLD = 1074024717

SNDCTL_SYNTH_CONTROL = 3483652373
SNDCTL_SYNTH_ID = 3230421268
SNDCTL_SYNTH_INFO = 3230421250
SNDCTL_SYNTH_MEMAVL = 3221508366
SNDCTL_SYNTH_REMOVESAMPLE = 3222032662

SNDCTL_TMR_CONTINUE = 21508
SNDCTL_TMR_METRONOME = 1074025479
SNDCTL_TMR_SELECT = 1074025480
SNDCTL_TMR_SOURCE = 3221509126
SNDCTL_TMR_START = 21506
SNDCTL_TMR_STOP = 21507
SNDCTL_TMR_TEMPO = 3221509125
SNDCTL_TMR_TIMEBASE = 3221509121

SOUND_MIXER_ALTPCM = 10
SOUND_MIXER_BASS = 1
SOUND_MIXER_CD = 8
SOUND_MIXER_DIGITAL1 = 17
SOUND_MIXER_DIGITAL2 = 18
SOUND_MIXER_DIGITAL3 = 19
SOUND_MIXER_IGAIN = 12
SOUND_MIXER_IMIX = 9
SOUND_MIXER_LINE = 6
SOUND_MIXER_LINE1 = 14
SOUND_MIXER_LINE2 = 15
SOUND_MIXER_LINE3 = 16
SOUND_MIXER_MIC = 7
SOUND_MIXER_MONITOR = 24
SOUND_MIXER_NRDEVICES = 25
SOUND_MIXER_OGAIN = 13
SOUND_MIXER_PCM = 4
SOUND_MIXER_PHONEIN = 20
SOUND_MIXER_PHONEOUT = 21
SOUND_MIXER_RADIO = 23
SOUND_MIXER_RECLEV = 11
SOUND_MIXER_SPEAKER = 5
SOUND_MIXER_SYNTH = 3
SOUND_MIXER_TREBLE = 2
SOUND_MIXER_VIDEO = 22
SOUND_MIXER_VOLUME = 0

# functions

def open(*args, **kwargs): # real signature unknown
    pass

def openmixer(*args, **kwargs): # real signature unknown
    pass

# classes

class OSSAudioError(Exception):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""



error = OSSAudioError


# variables with complex values

control_labels = [
    'Vol  ',
    'Bass ',
    'Trebl',
    'Synth',
    'Pcm  ',
    'Spkr ',
    'Line ',
    'Mic  ',
    'CD   ',
    'Mix  ',
    'Pcm2 ',
    'Rec  ',
    'IGain',
    'OGain',
    'Line1',
    'Line2',
    'Line3',
    'Digital1',
    'Digital2',
    'Digital3',
    'PhoneIn',
    'PhoneOut',
    'Video',
    'Radio',
    'Monitor',
]

control_names = [
    'vol',
    'bass',
    'treble',
    'synth',
    'pcm',
    'speaker',
    'line',
    'mic',
    'cd',
    'mix',
    'pcm2',
    'rec',
    'igain',
    'ogain',
    'line1',
    'line2',
    'line3',
    'dig1',
    'dig2',
    'dig3',
    'phin',
    'phout',
    'video',
    'radio',
    'monitor',
]

__loader__ = None # (!) real value is ''

__spec__ = None # (!) real value is ''

