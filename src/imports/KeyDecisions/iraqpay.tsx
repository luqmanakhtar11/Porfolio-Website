import imgImageWalletSelectionScreen from "./671d6eb9a4edbbe3e0136257d3a982dc601cd888.png";
import imgImageTransferStatusScreen from "./9415ff9a321f6552835b0e0d01be96b2c9732853.png";
import imgImageBusinessVerificationScreen from "./fb6e04f5b253590ecdcc04eef4504d55822afa77.png";

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[570px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[27.9px] not-italic relative shrink-0 text-[#65718a] text-[18px] tracking-[2.88px] uppercase whitespace-nowrap">Key decisions</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Arial_Narrow:Extra_Bold',sans-serif] leading-[77.08px] not-italic relative shrink-0 text-[#07142d] text-[82px] tracking-[-4.51px] w-[518px]">Confidence is a design feature.</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[182px] items-start justify-self-stretch relative row-1 self-end shrink-0" data-name="Container">
      <Paragraph />
      <Heading />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="col-2 content-stretch flex flex-col h-[84px] items-start justify-self-stretch max-w-[570px] relative row-1 self-end shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[27.9px] not-italic relative shrink-0 text-[#65718a] text-[18px] w-[570px]">Financial UX succeeds when users can predict what happens next. Three patterns do most of that work in IraqPay: contextual setup, progressive verification, and explicit transaction states.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-x-[60px] gap-y-[60px] grid grid-cols-[__517.50px_862.50px] grid-rows-[_182.05px] h-[182px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Paragraph1 />
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0" data-name="Heading 3:margin">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[38.75px] not-italic relative shrink-0 text-[#07142d] text-[25px] tracking-[-0.875px] w-[270px]">Choose the wallet before completing the paperwork.</p>
    </div>
  );
}

function ImageWalletSelectionScreen() {
  return (
    <div className="h-[404px] relative shrink-0 w-[287px]" data-name="Image (Wallet selection screen)">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWalletSelectionScreen} />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[rgba(237,244,255,0)] h-[300px] items-center justify-end left-0 to-[#edf4ff] top-[203.13px] via-[40%] via-[rgba(237,244,255,0.7)] w-[463px]" data-name="Container">
      <ImageWalletSelectionScreen />
    </div>
  );
}

function Article() {
  return (
    <div className="bg-[#fbfcff] border border-[#d9e1ee] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch min-h-[460px] overflow-clip pb-[310px] pt-[30px] px-[30px] relative rounded-[25px] row-1 self-stretch shrink-0" data-name="Article">
      <Heading3Margin />
      <Container4 />
    </div>
  );
}

function Heading3Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0" data-name="Heading 3:margin">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[38.75px] not-italic relative shrink-0 text-[#07142d] text-[25px] tracking-[-0.875px] w-[270px]">Treat every state as part of the transaction.</p>
    </div>
  );
}

function ImageTransferStatusScreen() {
  return (
    <div className="absolute h-[418px] left-[-2.16px] top-[159px] w-[467px]" data-name="Image (Transfer status screen)">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageTransferStatusScreen} />
    </div>
  );
}

function Article1() {
  return (
    <div className="bg-[#fbfcff] border border-[#d9e1ee] border-solid col-3 content-stretch flex flex-col items-start justify-self-stretch min-h-[460px] overflow-clip pb-[310px] pt-[30px] px-[30px] relative rounded-[25px] row-1 self-stretch shrink-0" data-name="Article">
      <Heading3Margin1 />
      <ImageTransferStatusScreen />
    </div>
  );
}

function Heading3Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0" data-name="Heading 3:margin">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[38.75px] not-italic relative shrink-0 text-[#07142d] text-[25px] tracking-[-0.875px] w-[270px]">Break verification into visible, recoverable steps.</p>
    </div>
  );
}

function ImageBusinessVerificationScreen() {
  return (
    <div className="h-[416px] relative shrink-0 w-[463px]" data-name="Image (Business verification screen)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[87.21%] left-0 max-w-none top-[-0.13%] w-full" src={imgImageBusinessVerificationScreen} />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[rgba(237,244,255,0)] h-[344px] items-start justify-center left-[-0.83px] to-[#edf4ff] top-[159px] via-[40%] via-[rgba(237,244,255,0.7)] w-[465px]" data-name="Container">
      <ImageBusinessVerificationScreen />
    </div>
  );
}

function Article2() {
  return (
    <div className="bg-[#fbfcff] border border-[#d9e1ee] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch min-h-[460px] overflow-clip pb-[310px] pt-[30px] px-[30px] relative rounded-[25px] row-1 self-stretch shrink-0" data-name="Article">
      <Heading3Margin2 />
      <Container5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="gap-x-[22px] gap-y-[22px] grid grid-cols-[___465.33px_465.33px_465.34px] grid-rows-[_470.25px] h-[470px] relative shrink-0 w-full" data-name="Container">
      <Article />
      <Article1 />
      <Article2 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[56px] relative shrink-0 w-full" data-name="Container:margin">
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1440px]" data-name="Container">
      <Container1 />
      <ContainerMargin />
    </div>
  );
}

export default function KeyDecisions() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center relative size-full" data-name="Key Decisions">
      <Container />
    </div>
  );
}