/**
 * Created by root on 17-7-12.
 */
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
function part(all_collection){
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
function count_number(base_list,comput_count) {
    var count_number_a=[];
    for(var i=0;i<comput_count.length;i++){
        for(var j=0;j<base_list.length;j++){
            if(comput_count[i].barcode===base_list[j].barcode){
                base_list[j].count=comput_count[i].count;
                count_number_a.push(base_list[j]);
            }
        }
    }
    return count_number_a;
}
function every_save_money(discount_collection,count_number){
    var every_save_money_a=[];
    for(var i=0;i<count_number.length;i++){
        for(var j=0;j<discount_collection.length;j++){
            if(count_number[i].barcode===discount_collection[j]){
                if(count_number[i].count>=2){
                    var free=count_number[i].price;
                    every_save_money_a.push(free);
                }
            }
        }
    }
    return every_save_money_a;
}
function all_save_money(every_save_money){
    var all_save_money_a=0;
    for(var i=0;i<every_save_money.length;i++){
        all_save_money_a+=every_save_money[i];
    }
    return all_save_money_a;
}
function after_save_every_sum(count_number,every_save_money,discount_collection){
    var after_save_every_sum_a=[];
    var k=0;

    for(var i=0;i<count_number.length;i++){
        var flag=0;
        for(var j=0;j<discount_collection.length;j++){
            var sum=count_number[i].count*count_number[i].price;
            if(count_number[i].barcode===discount_collection[j]){
                flag=1;
            }
        }
        if(flag===0)
            after_save_every_sum_a.push(sum);
        else{
            after_save_every_sum_a.push(sum-every_save_money[k]);
            k++;
        }
    }
    return after_save_every_sum_a;
}
function all_sum(after_save_every_sum){
    var all_sum_a=0;
    for(var i=0;i<after_save_every_sum.length;i++){
        all_sum_a+=after_save_every_sum[i];
    }
    return all_sum_a;
}
function print(count_number,after_save_every_sum,all_sum,all_save_money){
    var str='***<没钱赚商店>收据***';
    var content='';
    for(var i=0;i<count_number.length;i++){
        content+='名称：'+count_number[i].name+'，数量：'+count_number[i].count+count_number[i].unit+'，单价：'+count_number[i].price.toFixed(2)+'(元)，小计：'+
            after_save_every_sum[i].toFixed(2)+'(元)'+'\n';
    }
    str=str+'\n'+content+'----------------------'+'\n'+'总计：'+all_sum.toFixed(2)+'(元)'+'\n'+'节省：'+all_save_money.toFixed(2)+'\n'+'**********************';
    return str;
}
var barcodeMoreCollection=part(all_collection);
var computeCount=compute_count(all_collection,barcodeMoreCollection);
var countNumber=count_number(base_list,computeCount);
var everySaveMoney=every_save_money(discount_collection,countNumber);
var allSaveMoney=all_save_money(everySaveMoney);
var afterSaveEverySum=after_save_every_sum(countNumber,everySaveMoney,discount_collection);
var allSum=all_sum(afterSaveEverySum);
var Print=print(countNumber,afterSaveEverySum,allSum,allSaveMoney);
console.log(Print);