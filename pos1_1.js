/*** Created by root on 17-7-12.*/
        function loadAllItems() {
        return [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
            },
            {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            }
        ];
    }

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
var base_list=loadAllItems();
var discount_collection=loadPromotions()[0].barcodes;
var all_collection=
    [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2.5',
        'ITEM000005',
        'ITEM000005-2'
    ];
function split(all_collection){
    var barcode_more_collection=[];
    var temp,k=0;
    for(var i=0;i<all_collection.length;i++){
        if(all_collection[i].indexOf('-')>=0){
            temp=all_collection[i].split('-');
            barcode_more_collection[k]={};
            barcode_more_collection[k].barcode=temp[0];
            barcode_more_collection[k].count=Number(temp[1]);
            k++;
        }
    }
    return barcode_more_collection;
}
function compute_count(all_collection,barcode_more_collection){
    var compute_count_a=[];
    var k=0;
    compute_count_a[0]={};
    compute_count_a[0].barcode=all_collection[0];
    compute_count_a[0].count=1;
    for(var i=1;i<all_collection.length;i++){
        for(var j=0;j<compute_count_a.length;j++){
            if(all_collection[i]===compute_count_a[j].barcode){
                compute_count_a[j].count++;
            }
            else if(j===compute_count_a.length-1&&all_collection[i].indexOf('-')<0){
                var object={};
                object.barcode=all_collection[i];
                object.count=1;
                compute_count_a.push(object);
            }
            else if(all_collection[i].indexOf('-')>=0){
                var tag=all_collection[i].split('-');
                for(var s=0;s<compute_count_a.length;s++){
                    if(compute_count_a[s].barcode===tag[0])break;
                }
                if(s!==compute_count_a.length-1){
                    compute_count_a.push(barcode_more_collection[k]);
                    k++;
                    break;
                }
                else{
                    compute_count_a[s].count++;
                    break;
                }
            }
        }
    }
    return compute_count_a;
}
function new_list(base_list,compute_count) {
    var new_list=[];
    for(var i=0;i<compute_count.length;i++){
        for(var j=0;j<base_list.length;j++){
            if(compute_count[i].barcode===base_list[j].barcode){
                base_list[j].count=compute_count[i].count;
                new_list.push(base_list[j]);
            }
        }
    }
    return new_list;
}
function every_save_money(discount_collection,new_list){
    var every_save_money_a=[];
    var  k=0;
    var  free_info=[];
    var flag;
    for(var i=0;i<new_list.length;i++){
        free_info[k]={};
        free_info[k].barcode=new_list[i].barcode;
        flag=0;
        for(var j=0;j<discount_collection.length;j++) {
            if (new_list[i].barcode === discount_collection[j]) {
                flag = 1;
                break;
            }
        }
        if(flag===1){
            if(new_list[i].count>=2){
                free_info[k].money=new_list[i].price;
            }
            else{
                free_info[k].money=0;
            }
        }
        else{
            free_info[k].money=0;
        }
        every_save_money_a.push(free_info[k]);
        k++;
    }
    return every_save_money_a;
}
function all_save_money(every_save_money){
    var all_save_money_a=0;
    for(var i=0;i<every_save_money.length;i++){
        all_save_money_a+=every_save_money[i].money;
    }
    return all_save_money_a;
}
function after_save_every_sum(new_list,every_save_money){
    var after_save_every_sum_a=[];
    for(var i=0;i<new_list.length;i++){
        var sum_info={};
        sum_info.barcode=every_save_money[i].barcode;
        sum_info.money=new_list[i].price*(new_list[i].count-1);
        after_save_every_sum_a.push(sum_info);
    }
    return after_save_every_sum_a;
}
function all_sum(after_save_every_sum){
    var all_sum_a=0;
    for(var i=0;i<after_save_every_sum.length;i++){
        all_sum_a+=after_save_every_sum[i].money;
    }
    return all_sum_a;
}
function print(new_list,after_save_every_sum,all_sum,all_save_money){
    var str='***<没钱赚商店>收据***';
    var content='';
    for(var i=0;i<new_list.length;i++){
        content+='名称：'+new_list[i].name+'，数量：'+new_list[i].count+new_list[i].unit+'，单价：'+new_list[i].price.toFixed(2)+'(元)，小计：'+
            after_save_every_sum[i].money.toFixed(2)+'(元)'+'\n';
    }
    str=str+'\n'+content+'----------------------'+'\n'+'总计：'+all_sum.toFixed(2)+'(元)'+'\n'+'节省：'+all_save_money.toFixed(2)+'(元)'+'\n'+'**********************';
    return str;
}
var barcodeMoreCollection=split(all_collection);
var computeCount=compute_count(all_collection,barcodeMoreCollection);
var newList=new_list(base_list,computeCount);
var everySaveMoney=every_save_money(discount_collection,newList);
var allSaveMoney=all_save_money(everySaveMoney);
var afterSaveEverySum=after_save_every_sum(newList,everySaveMoney,discount_collection);
var allSum=all_sum(afterSaveEverySum);
var Print=print(newList,afterSaveEverySum,allSum,allSaveMoney);
console.log(Print);

